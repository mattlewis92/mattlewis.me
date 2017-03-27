import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { API_ENDPOINT } from '../constants';

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
    user: TweetUser
  };
  user: TweetUser;
}

@Component({
  selector: 'mwl-tweets',
  templateUrl: './tweets.component.html'
})
export class TweetsComponent implements OnInit {

  tweetLoadError = false;

  tweets$: Observable<Tweet[]>;

  constructor(private http: Http, @Inject(API_ENDPOINT) private apiEndpoint: string) {}

  ngOnInit() {
    this.tweets$ = this.http.get(`${this.apiEndpoint}/social/tweets`).catch((err: Response) => {
      this.tweetLoadError = true;
      return of(err);
    }).map(res => res.json());
  }

}
