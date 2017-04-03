import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'mwl-homepage',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      System.import('fastclick').then(fastclick => {
        fastclick.attach(document.body);
      });
    }
  }

}
