import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'trustAsResourceUrl'
})
export class TrustAsResourceUrlPipe implements PipeTransform {

  constructor(private sanitize: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl(url);
  }

}
