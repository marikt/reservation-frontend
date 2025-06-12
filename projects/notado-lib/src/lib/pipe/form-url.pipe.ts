import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formUrl',
  standalone: true
})
export class FormUrlPipe implements PipeTransform {

  /**
   *
   * If you change the the transformation do also in BE business.getUrlAdjusted
   */
  transform(url: string): any {
    if (!url) {
      return '';
    }

    url = url
      .replace('www.', '')
      .replace('http://', '')
      .replace('https://', '')
      .replace('.cz', '')
      .replace('.de', '')
      .replace('.es', '')
      .replace('.eu', '')
      .replace('.org', '')
      .replace('.net', '')
      .replace('.sk', '')
      .replace('.pl', '')
      .replace('.com', '');

    url = url.split('/').join('-');
    url = url.split('.').join('-');
    url = url.split('#').join('');
    url = url.split('?').join('');
    url = url.split('&').join('');

    let currentHostname = typeof window !== 'undefined' && window.location && window.location.hostname
      ? window.location.hostname
      : 'localhost';
    currentHostname = currentHostname.replace('www.', '');

    return 'https://' + url + '.' + currentHostname;
  }

}
