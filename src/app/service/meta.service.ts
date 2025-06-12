import {Inject, Injectable} from '@angular/core';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {DOCUMENT, Location} from '@angular/common';
import {Router} from '@angular/router';
import {LanguageService} from '../../../projects/notado-lib/src/lib/service/language.service';
// @ts-ignore
import cs from '../../assets/i18n/cs.json';
// @ts-ignore
import de from '../../assets/i18n/de.json';
// @ts-ignore
import en from '../../assets/i18n/en.json';
// @ts-ignore
import es from '../../assets/i18n/es.json';
// @ts-ignore
import pl from '../../assets/i18n/pl.json';
// @ts-ignore
import sk from '../../assets/i18n/sk.json';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';

@Injectable({
  providedIn: 'root'
})

export class MetaService extends MySubscribable {

  private descSelector: string = 'property="description"';
  private metaDescription: HTMLMetaElement;
  private metaKey: string = '';

  constructor(
    private titleService: Title,
    private meta: Meta,
    public broadcastService: BroadcastService,
    public location: Location,
    public router: Router,
    public languageService: LanguageService,
    @Inject(DOCUMENT) public document: Document
  ) {
    super(broadcastService);
    const descMeta: MetaDefinition = {name: 'description', content: ''};
    this.metaDescription = this.initElement(this.descSelector, descMeta);
    this.subscribe(Event.LANGUAGE_SWITCH, (language: string) => {
      this.setMetaData(this.metaKey, '', language);
    });
  }

  public setCsMetaData(title: string, description: string) {
    this.document.documentElement.lang = 'cs';

    const titleMeta: MetaDefinition = {property: 'title', content: title};
    const titleMetaOg: MetaDefinition = {property: 'og:title', content: title};
    this.titleService.setTitle(title);
    this.meta.updateTag(titleMeta);
    this.meta.updateTag(titleMetaOg);

    const descMeta: MetaDefinition = {name: 'description', content: description};
    const descMetaOg: MetaDefinition = {property: 'og:description', content: description};
    this.meta.updateTag(descMeta);
    this.meta.updateTag(descMetaOg);

    this.setCanonical();
    this.setHRefLang();
  }

  public setMetaData(metaKey?: string, titlePrefix?: string, language?: string) {
    this.metaKey = metaKey;
    this.setTitle(metaKey, titlePrefix, language);
    this.setMetaDescription(metaKey, language);
    this.document.documentElement.lang = this.getLanguage();

    this.setCanonical();
    this.setHRefLang();
  }

  private setCanonical(): void {
    let element: HTMLLinkElement = this.document.querySelector(`link[rel='canonical']`) || null;

    if (element == null) {
      element = this.document.createElement('link');
      element.setAttribute('rel', 'canonical');
      this.document.head.appendChild(element);
    }

    if (this.document.URL === 'https://www.notado.cz' ||
      this.document.URL === 'https://www.notado.cz/home') {
      element.setAttribute('href', 'https://www.notado.cz/cs/home');
    } else {
      element.setAttribute('href', this.document.URL);
    }
  }

  private setHRefLang(): void {
    const elementsList: NodeListOf<Element> = this.document.querySelectorAll(`link[rel='alternate']`);
    const elements: any = [];
    for (let i = 0; i < elementsList.length; i++) {
      elements.push(elementsList.item(i));
    }

    if (!elements || elements.length === 0) {
      const element = this.document.createElement('link');
      element.setAttribute('rel', 'alternate');
      element.setAttribute('hreflang', 'x-default');
      this.document.head.appendChild(element);
      elements.push(element);
      for (const language of this.languageService.languages) {
        const element = this.document.createElement('link');
        element.setAttribute('rel', 'alternate');
        element.setAttribute('hreflang', language);
        this.document.head.appendChild(element);
        elements.push(element);
      }
    }

    if (this.document.URL === 'https://www.notado.cz' ||
      this.document.URL === 'https://www.notado.cz/home') {
      elements[0].setAttribute('href', 'https://www.notado.cz/home');
      for (let i = 0; i < this.languageService.languages.length; i++) {
        const url = this.document.URL;
        elements[i + 1].setAttribute('href', 'https://www.notado.cz/' + this.languageService.languages[i] + '/home');
      }
    } else {
      const url = this.document.URL;
      const adjustedUrl = url.replace('/' + this.languageService.language + '/', '/cs/');
      elements[0].setAttribute('href', adjustedUrl);

      for (let i = 0; i < this.languageService.languages.length; i++) {
        const url = this.document.URL;
        const adjustedUrl = url.replace('/' + this.languageService.language + '/', '/' + this.languageService.languages[i] + '/');
        elements[i + 1].setAttribute('href', adjustedUrl);
      }
    }
  }

  private setTitle(title: string, titlePrefix?: string, language?: string) {
    title = this.translate(title, language);
    if (!title) {
      title = 'Reservation system for small business';
    }

    if (!titlePrefix) {
      titlePrefix = '';
    }

    const titleMeta: MetaDefinition = {property: 'title', content: titlePrefix + title};
    const titleMetaOg: MetaDefinition = {property: 'og:title', content: titlePrefix + title};
    this.titleService.setTitle(titlePrefix + title);
    this.meta.updateTag(titleMeta);
    this.meta.updateTag(titleMetaOg);
  }

  private setMetaDescription(description: string, language?: string) {
    if (!description) {
      return;
    }

    description = this.translate(description + '_DESC', language);
    if (!description) {
      description = 'Allow clients to book services directly from your website. Online reservations for massage studios, car repair shops, hairdressers, beauty salons, wellness centers, doctor\'s surgeries, dentists.';
    }

    const descMeta: MetaDefinition = {name: 'description', content: description};
    const descMetaOg: MetaDefinition = {property: 'og:description', content: description};
    this.meta.updateTag(descMeta);
    this.meta.updateTag(descMetaOg);
  }

  private initElement(selector: string, metaDefinition: MetaDefinition): HTMLMetaElement {
    let element: HTMLMetaElement = this.meta.getTag(selector);
    if (element) {
      element = this.meta.addTag(metaDefinition);
    }
    return element;
  }

  private translate(key: string, language?: string): string {
    if (!key) {
      return;
    }
    if (!key.match('META.')) {
      return key;
    }
    key = key.replace('META.', '');

    let lang: string;
    if (language) {
      lang = language;
    } else {
      lang = this.getLanguage();
    }
    switch (lang) {
      case 'cs':
        return cs.META[key];
      case 'en':
        return en.META[key];
      case 'pl':
        return pl.META[key];
      case 'sk':
        return sk.META[key];
      case 'es':
        return es.META[key];
      case 'de':
        return de.META[key];
    }
    return 'Reservation system for small business';
  }

  private getLanguage(): string {
    let lang: string = this.languageService.getLanguageByUrl(this.router.url);
    if (lang) {
      return lang;
    }
    lang = this.languageService.language;
    if (lang) {
      return lang;
    }
    return this.languageService.languageDefault;
  }
}
