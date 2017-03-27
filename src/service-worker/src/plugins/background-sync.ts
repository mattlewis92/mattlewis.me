import {
  Operation,
  Plugin,
  PluginFactory,
  VersionWorker,
} from '@angular/service-worker/worker';
import * as localforage from 'localforage';
import { API_ENDPOINT, BACKGROUND_SYNC_TYPE_CONTACT_EMAIL } from '../../../shared/constants';
import { BackgroundSyncMessage, ContactFormBackgroundSyncPayload } from '../../../shared/interfaces';
import { getServiceWorkerMessageStorageKey } from '../../../shared/functions';

export interface BackgroundSyncEvent extends Event {
  tag: string;
  waitUntil(promise: Promise<any>);
  ports: MessagePort[]
}

const RATE_LIMITED_STATUS_CODE: number = 429;

export function BackgroundSync(): PluginFactory<BackgroundSyncImpl> {
  return (worker: VersionWorker) => new BackgroundSyncImpl();
}

function getMessage(event: BackgroundSyncEvent): Promise<BackgroundSyncMessage<ContactFormBackgroundSyncPayload>> {
  return localforage.getItem(getServiceWorkerMessageStorageKey(event.tag)).then((message: BackgroundSyncMessage<ContactFormBackgroundSyncPayload>) => {
    if (!message) {
      console.warn(`Message for id ${event.tag} not found!`);
    }
    return message;
  });
}

function sendResponse(event: BackgroundSyncEvent, response) {
  return event.ports[0].postMessage(JSON.stringify(response));
}

function handleMessage(event: BackgroundSyncEvent, message: BackgroundSyncMessage<ContactFormBackgroundSyncPayload>): Promise<any> {

  switch (message.type) {

    case BACKGROUND_SYNC_TYPE_CONTACT_EMAIL:
      return fetch(`${API_ENDPOINT}/contact`, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message.payload.contactForm)
      }).then(res => {
        return res.json();
      }).then(result => {
        return sendResponse(event, {result, message});
      }).catch((error: Response) => {
        if (error.status === RATE_LIMITED_STATUS_CODE) {
          return error.json().then(result => sendResponse(event, {result, message}));
        } else {
          return Promise.reject(error);
        }
      });

    default:
      console.warn(`"${message.type}" is not a valid message type`);
  }

}

export class BackgroundSyncImpl implements Plugin<BackgroundSyncImpl> {

  setup(operations: Operation[]): void {
    self.addEventListener('sync', (event: BackgroundSyncEvent) => {
      const messageSent: Promise<any> = getMessage(event).then(message => handleMessage(event, message));
      event.waitUntil(messageSent);
    });
  }

}