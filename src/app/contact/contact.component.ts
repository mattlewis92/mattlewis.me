import { Component, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { API_ENDPOINT } from '../constants';
import { getServiceWorkerMessageStorageKey } from '../../shared/functions';
import { ContactForm, BackgroundSyncContactFormMessage, BackgroundSyncMessage, BackgroundSyncResult } from '../../shared/interfaces';
import { BACKGROUND_SYNC_TYPE_CONTACT_EMAIL } from '../../shared/constants';

@Component({
  selector: 'mwl-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  contactForm: any;

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

    const sendWithAngular = () => {
      this.http.post(`${this.apiEndpoint}/contact`, this.form).map(res => res.json()).finally(() => {
        this.loading = false;
      }).subscribe(() => {
        this.emailSent = true;
      }, (err: Response) => {
        this.error = err.json();
      });
    };

    if ('serviceWorker' in navigator && 'SyncManager' in window) {

      Promise.all([
        System.import('localforage'),
        System.import('uuid/v4')
      ]).then(([localforage, uuid]) => {

        // always used indexeddb as its the only driver available to a service worker
        localforage.setDriver(localforage.INDEXEDDB);

        const message: BackgroundSyncMessage<BackgroundSyncContactFormMessage> = {
          type: BACKGROUND_SYNC_TYPE_CONTACT_EMAIL,
          payload: {
            contactForm: this.form
          }
        };

        const messageId: string = uuid();
        const messageSaved: Promise<any> = localforage.setItem(getServiceWorkerMessageStorageKey(messageId), message);

        fromEvent(navigator.serviceWorker, 'message')
          .map((serviceWorkerMessage: ServiceWorkerMessageEvent) => JSON.parse(serviceWorkerMessage.data))
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

        return Promise.all([
          navigator.serviceWorker.ready,
          messageSaved
        ]).then(([swRegistration]: [ServiceWorkerRegistration]) => {
          return swRegistration.sync.register(messageId);
        }).catch(() => {
          sendWithAngular();
        });

      });

    } else {
      sendWithAngular();
    }
  }

}
