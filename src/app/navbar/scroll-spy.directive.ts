import { Directive, HostListener, Input, AfterViewInit, Inject, HostBinding, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { PageScrollConfig } from 'ngx-page-scroll';

function adjustPosition(yCoord: number): number {
  return Math.floor(yCoord) - PageScrollConfig.defaultScrollOffset;
}

@Directive({
  selector: '[mwlScrollSpy]'
})
export class ScrollSpyDirective implements AfterViewInit {

  @HostBinding('class.active') isActive = false;

  @Input('mwlScrollSpy') elementId: string; // tslint:disable-line

  constructor(@Inject(DOCUMENT) private document: any, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.onScroll());
  }


  @HostListener('document:scroll')
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const boundingRectangle: ClientRect = this.document.querySelector(`#${this.elementId}`).getBoundingClientRect();
      this.isActive = adjustPosition(boundingRectangle.top) <= 0 && adjustPosition(boundingRectangle.bottom) > 0;
    }
  }

}
