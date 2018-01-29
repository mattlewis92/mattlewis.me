import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import {
  DOCUMENT,
  HashLocationStrategy,
  isPlatformBrowser
} from '@angular/common';
import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll';

@Component({
  selector: 'mwl-homepage',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: any,
    private pageScrollService: PageScrollService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      System.import('fastclick').then((fastclick) => {
        fastclick.attach(document.body);
      });

      const params = new URLSearchParams(window.location.search);
      if (params.has('section')) {
        setTimeout(() => {
          this.pageScrollService.start(
            PageScrollInstance.simpleInstance(
              this.document,
              `#${params.get('section')}`
            )
          );
        }, 2000);
      }
    }
  }
}
