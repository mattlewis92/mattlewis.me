import {
  Operation,
  Plugin,
  PluginFactory,
  VersionWorker,
} from '@angular/service-worker/worker';
import * as localforage from 'localforage';
import { API_ENDPOINT, BACKGROUND_SYNC_TYPE_CONTACT_EMAIL } from '../../../shared/constants';
import { BackgroundSyncMessage, BackgroundSyncContactFormMessage, BackgroundSyncResult } from '../../../shared/interfaces';
import { getServiceWorkerMessageStorageKey } from '../../../shared/functions';

localforage.setDriver(localforage.INDEXEDDB);

export interface BackgroundSyncEvent extends Event {
  tag: string;
  waitUntil(promise: Promise<any>);
  lastChance: boolean;
}

const RATE_LIMITED_STATUS_CODE: number = 429;

export function BackgroundSync(): PluginFactory<BackgroundSyncImpl> {
  return (worker: VersionWorker) => new BackgroundSyncImpl();
}

function getMessage(event: BackgroundSyncEvent): Promise<BackgroundSyncMessage<BackgroundSyncContactFormMessage>> {
  return localforage.getItem(getServiceWorkerMessageStorageKey(event.tag)).then((message: BackgroundSyncMessage<BackgroundSyncContactFormMessage>) => {
    if (!message) {
      console.warn(`Message for id ${event.tag} not found!`);
    }
    return message;
  });
}

function sendResponse(event: BackgroundSyncEvent, response: BackgroundSyncResult<BackgroundSyncContactFormMessage>) {
  return event.currentTarget['clients'].matchAll().then((clients) => {
    const promises = clients.map(client => client.postMessage(JSON.stringify(response)));
    return Promise.all(promises);
  })
}

function handleMessage(event: BackgroundSyncEvent, message: BackgroundSyncMessage<BackgroundSyncContactFormMessage>): Promise<any> {

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
        if (res.status === RATE_LIMITED_STATUS_CODE) {
          return Promise.reject(res);
        }
        return res.json();
      }).then(result => {
        return sendResponse(event, {id: event.tag, result, message, isError: false});
      }).catch((error: Response) => {
        if (error.status === RATE_LIMITED_STATUS_CODE) {
          return error.json().then(result => sendResponse(event, {id: event.tag, result, message, isError: true}));
        } else {
          return Promise.reject(error);
        }
      });

    default:
      console.warn(`"${message.type}" is not a valid message type`);
  }

}

self.addEventListener('sync', (event: BackgroundSyncEvent) => {
  const messageSent: Promise<any> = getMessage(event).then(message => handleMessage(event, message));
  event.waitUntil(messageSent);
});

export class BackgroundSyncImpl implements Plugin<BackgroundSyncImpl> {
  setup(operations: Operation[]): void {}
}