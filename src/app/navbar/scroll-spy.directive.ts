import { Directive, HostListener, Input, AfterViewInit } from '@angular/core';
import { PageScrollConfig } from 'ng2-page-scroll';

function adjustPosition(yCoord: number): number {
  return yCoord - PageScrollConfig.defaultScrollOffset;
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

  ngAfterViewInit(): void {
    setTimeout(() => this.onScroll());
  }

  @HostListener('document:scroll')
  onScroll() {
    const boundingRectangle: ClientRect = document.getElementById(this.elementId).getBoundingClientRect();
    this.isActive = adjustPosition(boundingRectangle.top) <= 0 && adjustPosition(boundingRectangle.bottom) >= 0;
  }

}
