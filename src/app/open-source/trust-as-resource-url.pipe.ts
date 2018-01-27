import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'mwlTrustAsResourceUrl'
})
export class TrustAsResourceUrlPipe implements PipeTransform {
  constructor(private sanitize: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl(url);
  }
}
