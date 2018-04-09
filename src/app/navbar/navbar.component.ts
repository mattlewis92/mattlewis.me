import { Component } from '@angular/core';
import { PageScrollConfig } from 'ngx-page-scroll';

PageScrollConfig.defaultDuration = 300;
PageScrollConfig.defaultScrollOffset = 60;

@Component({
  selector: 'mwl-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuVisible = false;

  closeMenu(): void {
    this.isMenuVisible = false;
  }
}
