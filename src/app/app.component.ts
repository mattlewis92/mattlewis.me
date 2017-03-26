import { Component, OnInit } from '@angular/core';
import * as fastclick from 'fastclick';

declare const IS_SERVER: boolean;

@Component({
  selector: 'mwl-homepage',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    if (typeof IS_SERVER !== 'undefined' && !IS_SERVER) {
      fastclick.attach(document.body);
    }
  }

}
