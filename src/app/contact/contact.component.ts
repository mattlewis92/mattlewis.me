import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators/finalize';
import { API_ENDPOINT } from '../constants';

@Component({
  selector: 'mwl-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  contactForm: any;

  emailSent = false;

  loading = false;

  form = {
    name: '',
    email: '',
    message: ''
  };

  error: {
    message: string;
  };

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint: string) {}

  sendEmail() {
    this.loading = true;

    this.http.post(`${this.apiEndpoint}/contact`, this.form).pipe(finalize(() => {
      this.loading = false;
    })).subscribe(() => {
      this.emailSent = true;
    }, (err: HttpErrorResponse) => {
      this.error = err.error;
    });
  }

}
