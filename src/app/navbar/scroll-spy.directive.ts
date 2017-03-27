import { Directive, HostListener, Input, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { PageScrollConfig } from 'ng2-page-scroll';

function adjustPosition(yCoord: number): number {
  return Math.floor(yCoord) - PageScrollConfig.defaultScrollOffset;
}

@Directive({
  selector: '[mwlScrollSpy]',
  host: {
    '[class.active]': 'isActive'
  }
})
export class ScrollSpyDirective implements AfterViewInit {

  isActive = false;

  @Input('mwlScrollSpy') elementId: string;

  constructor(@Inject(DOCUMENT) private document: any) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.onScroll());
  }

  @HostListener('document:scroll')
  onScroll() {
    if (typeof this.document.querySelector !== 'undefined') {
      const boundingRectangle: ClientRect = this.document.querySelector(`#${this.elementId}`).getBoundingClientRect();
      this.isActive = adjustPosition(boundingRectangle.top) <= 0 && adjustPosition(boundingRectangle.bottom) > 0;
    }
  }

}
