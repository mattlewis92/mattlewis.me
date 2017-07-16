import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_ENDPOINT } from '../constants';

const REPOS_TO_DISPLAY: number[] = [57139102, 57882334, 59231143, 59588399, 79842860, 48181747];

@Component({
  selector: 'mwl-open-source',
  templateUrl: './open-source.component.html',
  styles: [`
    @media only screen and (min-width: 1024px) {
      .description {
        height: 63px;
      }
    }
  `]
})
export class OpenSourceComponent implements OnInit {

  repos$: Observable<any[]>;

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint: string) {}

  ngOnInit(): void {
    this.repos$ = this.http.get<any[]>(`${this.apiEndpoint}/social/github/repos`).map(repos => {
      return REPOS_TO_DISPLAY.map(repoId => repos.find(repo => repo.id === repoId));
    });
  }

}
