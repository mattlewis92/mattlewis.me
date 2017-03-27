import { Component, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as localforage from 'localforage';
import * as uuid from 'uuid/v4';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { API_ENDPOINT } from '../constants';
import { getServiceWorkerMessageStorageKey } from '../../shared/functions';
import { ContactForm, BackgroundSyncContactFormMessage, BackgroundSyncMessage, BackgroundSyncResult } from '../../shared/interfaces';
import { BACKGROUND_SYNC_TYPE_CONTACT_EMAIL } from '../../shared/constants';

// always used indexeddb as its the only driver available to a service worker
localforage.setDriver(localforage.INDEXEDDB);

@Component({
  selector: 'mwl-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  emailSent = false;

  loading = false;

  form: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  error: {
    message: string;
  };

  constructor(private http: Http, @Inject(API_ENDPOINT) private apiEndpoint: string) {}

  sendEmail() {
    this.loading = true;

    function sendWithAngular() {
      this.http.post(`${this.apiEndpoint}/contact`, this.form).map(res => res.json()).finally(() => {
        this.loading = false;
      }).subscribe(() => {
        this.emailSent = true;
      }, (err: Response) => {
        this.error = err.json();
      });
    }

    if ('serviceWorker' in navigator && 'SyncManager' in window) {

      const message: BackgroundSyncMessage<BackgroundSyncContactFormMessage> = {
        type: BACKGROUND_SYNC_TYPE_CONTACT_EMAIL,
        payload: {
          contactForm: this.form
        }
      };

      const messageId: string = uuid();
      const messageSaved: Promise<any> = localforage.setItem(getServiceWorkerMessageStorageKey(messageId), message);

      fromEvent(navigator.serviceWorker, 'message')
        .map((message: ServiceWorkerMessageEvent) => JSON.parse(message.data))
        .filter((result: BackgroundSyncResult<BackgroundSyncContactFormMessage>) => {
          return result.message.type === BACKGROUND_SYNC_TYPE_CONTACT_EMAIL && result.id === messageId;
        })
        .take(1)
        .subscribe(({result, isError}) => {
          this.loading = false;
          if (!isError) {
            this.emailSent = true;
          } else {
            this.error = result;
          }
        });

      Promise.all([
        navigator.serviceWorker.ready,
        messageSaved
      ]).then(([swRegistration]: [ServiceWorkerRegistration]) => {
        return swRegistration.sync.register(messageId);
      }).catch(() => {
        sendWithAngular();
      });

    } else {
      sendWithAngular();
    }
  }

}
