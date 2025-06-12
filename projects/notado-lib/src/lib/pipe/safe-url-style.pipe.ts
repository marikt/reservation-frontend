import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';


/**
 * Dont use SafeUrlPipe as its problem to share it in modules
 */
@Pipe({
    name: 'safeUrlStyle',
    standalone: true
})
export class SafeUrlStylePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  public transform(value: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

}
