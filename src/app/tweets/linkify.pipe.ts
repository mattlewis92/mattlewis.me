import { Pipe, PipeTransform } from '@angular/core';
import linkify from 'linkifyjs/lib/linkify-string';

@Pipe({
  name: 'mwlLinkify'
})
export class LinkifyPipe implements PipeTransform {

  transform(value: string | undefined, opts?: any): string {
    return linkify(value, opts);
  }

}
