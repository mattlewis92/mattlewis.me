import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { API_ENDPOINT } from '../constants';
import { catchError } from 'rxjs/operators/catchError';

export interface TweetUser {
  id_str: string;
  screen_name: string;
  name: string;
  profile_image_url_https: string;
}

export interface Tweet {
  id_str: string;
  full_text: string;
  created_at: string;
  retweeted_status: {
    id_str: string;
    full_text: string;
    user: TweetUser;
  };
  user: TweetUser;
}

@Component({
  selector: 'mwl-tweets',
  templateUrl: './tweets.component.html'
})
export class TweetsComponent implements OnInit {
  tweetLoadError = false;

  tweets$: Observable<HttpErrorResponse | Tweet[]>;

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT) private apiEndpoint: string
  ) {}

  ngOnInit() {
    this.tweets$ = this.http
      .get<Tweet[]>(`${this.apiEndpoint}/social/tweets`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.tweetLoadError = true;
          return of(err);
        })
      );
  }
}
