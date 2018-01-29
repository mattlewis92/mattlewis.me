import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_ENDPOINT } from '../constants';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';
import { share } from 'rxjs/operators/share';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { Subject } from 'rxjs/Subject';
import { last } from 'rxjs/operators/last';

const REPOS_TO_DISPLAY: number[] = [
  57139102,
  57882334,
  59231143,
  59588399,
  79842860,
  48181747
];

const IMAGES_PER_REPO = 2;

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
export class OpenSourceComponent implements OnInit {
  @Output() reposLoaded = new EventEmitter();

  imgLoaded = new Subject();

  repos$: Observable<any[]>;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT) private apiEndpoint: string
  ) {}

  ngOnInit(): void {
    this.repos$ = this.http
      .get<any[]>(`${this.apiEndpoint}/social/github/repos`)
      .pipe(
        map((repos) => {
          return REPOS_TO_DISPLAY.map((repoId) =>
            repos.find((repo) => repo.id === repoId)
          );
        })
      )
      .pipe(share());

    this.repos$
      .pipe(take(1))
      .pipe(
        mergeMap((repos) => {
          // wait until all images have loaded, rxjs is so awesome
          return this.imgLoaded
            .pipe(take(repos.length * IMAGES_PER_REPO))
            .pipe(last());
        })
      )
      .subscribe(() => {
        this.reposLoaded.emit();
      });
  }
}
