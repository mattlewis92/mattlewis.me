import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_ENDPOINT } from '../constants';
import { map } from 'rxjs/operators/map';

const REPOS_TO_DISPLAY: number[] = [
  57139102,
  57882334,
  59231143,
  59588399,
  79842860,
  48181747
];

@Component({
  selector: 'mwl-open-source',
  templateUrl: './open-source.component.html',
  styles: [
    `
      @media only screen and (min-width: 1024px) {
        .description {
          height: 63px;
        }
      }
    `
  ]
})
export class OpenSourceComponent {
  readonly repos = [
    {
      name: 'angular-calendar',
      description:
        'A flexible calendar component for angular that can display events on a month, week or day view.',
      url: 'https://github.com/mattlewis92/angular-calendar'
    },
    {
      name: 'angular-resizable-element',
      description:
        'An angular directive that allows an element to be dragged and resized',
      url: 'https://github.com/mattlewis92/angular-resizable-element'
    },
    {
      name: 'angular-confirmation-popover',
      description: 'An angular bootstrap confirmation popover',
      url: 'https://github.com/mattlewis92/angular-confirmation-popover'
    },
    {
      name: 'karma-coverage-istanbul-reporter',
      description:
        'A karma reporter that uses the latest istanbul 1.x APIs to report coverage',
      url: 'https://github.com/mattlewis92/ karma-coverage-istanbul-reporter'
    },
    {
      name: 'webpack-retry-chunk-load-plugin',
      description:
        'A webpack plugin to retry loading of chunks that failed to load',
      url: 'https://github.com/mattlewis92/webpack-retry-chunk-load-plugin'
    },
    {
      name: 'angularx-flatpickr',
      description: 'An angular wrapper for flatpickr',
      url: 'https://github.com/mattlewis92/angularx-flatpickr'
    }
  ];
}
