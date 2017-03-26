import { Component, OnInit } from '@angular/core';
import * as fastclick from 'fastclick';

@Component({
  selector: 'mwl-homepage',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    fastclick.attach(document.body);
  }

}
