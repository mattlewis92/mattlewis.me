import { Component } from '@angular/core';

const YEAR_STARTED_PROGRAMMING = 2008;

@Component({
  selector: 'mwl-about',
  templateUrl: './about.component.html'
})
export class AboutComponent {
  yearsExperience: number = new Date().getFullYear() - YEAR_STARTED_PROGRAMMING;
}
