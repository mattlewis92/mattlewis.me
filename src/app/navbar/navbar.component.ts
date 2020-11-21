import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { PageScrollConfig } from 'ngx-page-scroll';
import { isPlatformBrowser } from '@angular/common';

PageScrollConfig.defaultDuration = 300;
PageScrollConfig.defaultScrollOffset = 60;

@Component({
  selector: 'mwl-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  email = isPlatformBrowser(this.platformId)
    ? 'mailto:website@mattlewis.me'
    : '';

  isMenuVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  closeMenu(): void {
    this.isMenuVisible = false;
  }
}
