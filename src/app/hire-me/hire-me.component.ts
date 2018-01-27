import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators/finalize';
import { API_ENDPOINT } from '../constants';

@Component({
  selector: 'mwl-hire-me',
  templateUrl: './hire-me.component.html'
})
export class HireMeComponent {
  contactForm: any;

  emailSent = false;

  loading = false;

  form = {
    name: '',
    email: '',
    companyWebsite: '',
    contractLength: '',
    hourlyRate: '',
    description: ''
  };

  error: {
    message: string;
  };

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT) private apiEndpoint: string
  ) {}

  sendEmail() {
    this.loading = true;

    const message = `
Name: ${this.form.name}
    
Company website: ${this.form.companyWebsite},
      
Contract length: ${this.form.contractLength}
      
Hourly rate: ${this.form.hourlyRate}
      
About the project:
${this.form.description}
`.trim();

    const { email, name } = this.form;

    this.http
      .post(`${this.apiEndpoint}/contact`, {
        name,
        email,
        message,
        contracting: true
      })
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        () => {
          this.emailSent = true;
        },
        (err: HttpErrorResponse) => {
          this.error = err.error;
        }
      );
  }
}
