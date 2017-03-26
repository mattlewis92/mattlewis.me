import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mwl-navbar',
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  isMenuVisible: boolean = false;

  closeMenu(): void {
    this.isMenuVisible = false;
  }

  showEmailCaptcha() {
    window.open(
      'https://www.google.com/recaptcha/mailhide/d?k=01ciEon6qhPUtHkA2796MjHQ==&c=ThGegkQW9KQ7Vs-mCVW7AgfavFhM0A417JovGr-JiHc=',
      '',
      'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=300'
    );
  }

}
