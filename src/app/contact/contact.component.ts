import { Component, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { API_ENDPOINT } from '../constants';

@Component({
  selector: 'mwl-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  emailSent: boolean = false;

  loading: boolean = false;

  form: {
    name?: string;
    email?: string;
    message?: string;
  } = {};

  error: {
    message: string;
  };

  constructor(private http: Http, @Inject(API_ENDPOINT) private apiEndpoint: string) {}

  sendEmail() {
    this.loading = true;
    this.http.post(`${this.apiEndpoint}/contact`, this.form).map(res => res.json()).finally(() => {
      this.loading = false;
    }).subscribe(() => {
      this.emailSent = true;
    }, (err: Response) => {
      this.error = err.json();
    });
  }

}
