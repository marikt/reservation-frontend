import {Inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NavigationEnd, Router} from '@angular/router';
import {CONST} from '../util/const';
import {DOCUMENT} from '@angular/common';
import {MySubscribable} from '../util/my-subscribable';
import {BroadcastService} from './broadcast.service';
import {Event} from '../util/event.enum';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends MySubscribable {

  public languageDefault: string = 'cs';
  public languages: string[] = ['cs', 'sk', 'en', 'pl'];
// , 'es', 'de', 'pl'
  public languagesRex: RegExp = /\/pl|\/cs|\/en|\/sk/;
  public init: boolean = false;
  public language: string;
  public languageLabel: string;

  constructor(
    private localStorage: LocalStorageService,
    public translate: TranslateService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
    public broadcastService: BroadcastService
  ) {

    super(broadcastService);

    router.events.subscribe((val) => {
      // see also
      if (!(val instanceof NavigationEnd)) {
        return;
      }

      const navigationEnd = val as NavigationEnd;
      const languageByUrl = this.getLanguageByUrl(navigationEnd.url);
      if (!languageByUrl || this.language === languageByUrl) {
        return; // do not set language when its already set
      }

      if (languageByUrl) {
        this.setLanguageInternally(languageByUrl);
      }
    });
  }

  public initLanguage(): void {
    if (this.init) {
      return;
    }

    if (this.router.url === '/') {
      return;
    }

    const lang = this.getLanguageByUrl(this.router.url);
    if (lang) {
      this.language = lang;
    }

    if (!this.language) {
      this.language = this.localStorage.get(CONST.LANGUAGE);
    }

    if (!this.language) {
      const browserLang = this.translate.getBrowserLang();
      this.language = browserLang.match(this.languagesRex) ? browserLang : this.languageDefault;
    }
    this.setLanguageInternally(this.language)
  }

  public getLanguageByUrl(url: string): string {
    for (const lang of this.languages) {
      if (url.includes('/' + lang + '/')) {
        return lang;
      }
    }
    return null;
  }

  public setLanguageForForm(language: string): void {
    console.log('set language ' + language);
    this.setLanguageInternally(language);
  }

  public setLanguageAndRedirectToUrlLang(language: string): void {
    if (!language) {
      return;
    }
    this.setLanguageInternally(language);

    let url = this.router.url;
    let urlChanged: boolean = false;
    if (url.match(this.languagesRex)) {
      url = url.replace(this.languagesRex, '/' + this.language);
      urlChanged = true;
    } else if (url.match('/home')) {
      url = url.replace('/home', '/' + this.language + '/home');
      urlChanged = true;
    }
    if (urlChanged) {
      this.router.navigate([url]).then(() => {
        this.fire(Event.LANGUAGE_SWITCH, language);
      });
    } else {
      this.fire(Event.LANGUAGE_SWITCH, language);
    }
    // window.location.reload();
  }

  public isCzOrSk(): boolean {
    return this.language === 'cs' || this.language === 'sk';
  }

  public getLabel(language: string) {
    switch (language) {
      case 'cs':
        return 'Čeština';
      case 'en':
        return 'English';
      case 'sk':
        return 'Slovensky';
      case 'pl':
        return 'Polskie';
      case 'de':
        return 'Deutsch';
      case 'es':
        return 'Español';
    }
  }

  private setLanguageInternally(language: string): void {
    if (!language) {
      return;
    }
    console.log('set language ' + language);
    this.localStorage.set(CONST.LANGUAGE, language);
    this.language = language;
    this.translate.use(language);
    this.languageLabel = this.getLabel(language);
    this.document.documentElement.lang = language;
    this.init = true;
  }
}
