import {Inject, Injectable} from '@angular/core';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';
import {DOCUMENT, Location} from '@angular/common';
import {Router} from '@angular/router';
import {LanguageService} from './language.service';

@Injectable({
  providedIn: 'root'
})

export class MetaForFormService {

  private descSelector: string = 'property="description"';
  private metaDescription: HTMLMetaElement;


  constructor(
    private titleService: Title,
    private meta: Meta,
    public location: Location,
    public router: Router,
    public languageService: LanguageService,
    @Inject(DOCUMENT) public document: Document
  ) {
    const descMeta: MetaDefinition = {name: 'description', content: ''};
    this.metaDescription = this.initElement(this.descSelector, descMeta);
  }

  public setMetaData(metaKey?: string, titlePrefix?: string) {
    this.setTitle(metaKey, titlePrefix);
    this.setMetaDescription(metaKey);
    this.document.documentElement.lang = this.getLanguage();
  }


  private setTitle(title: string, titlePrefix?: string) {
    title = this.translate(title);
    if (!title) {
      title = 'Reservation system for small business';
    }

    if (!titlePrefix) {
      titlePrefix = '';
    }

    let titleMeta: MetaDefinition = {property: 'title', content: titlePrefix + title};
    let titleMetaOg: MetaDefinition = {property: 'og:title', content: titlePrefix + title};
    this.titleService.setTitle(titlePrefix + title);
    this.meta.updateTag(titleMeta);
    this.meta.updateTag(titleMetaOg);
  }

  private setMetaDescription(description: string) {
    if (!description) {
      return;
    }

    description = this.translate(description + '_DESC');
    if (!description) {
      description = 'Allow clients to book services directly from your website. Online reservations for massage studios, car repair shops, hairdressers, beauty salons, wellness centers, doctor\'s surgeries, dentists.';
    }

    let descMeta: MetaDefinition = {name: 'description', content: description};
    let descMetaOg: MetaDefinition = {property: 'og:description', content: description};
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

  private translate(title: string): string {
    if (!title) {
      return;
    }
    if (!title.match('META.')) {
      return title;
    }
    title = title.replace('META.', '');
    let lang: string = this.getLanguage();
    switch (lang) {
      case 'cs':
        return this.cs[title];
      case 'en':
        return this.en[title];
      case 'pl':
        return this.pl[title];
      case 'ru':
        return this.ru[title];
      case 'sk':
        return this.sk[title];
      case 'es':
        return this.es[title];
      case 'de':
        return this.de[title];
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

  private cs: object = {
    'RESERVATION_CREATION': 'Vytvoření rezervace',
    'RESERVATION_CREATION_DESC': 'Vytvoření rezervace'
  };

  private es: object = {
    'RESERVATION_CREATION': 'Creando una reserva',
    'RESERVATION_CREATION_DESC': 'Creando una reserva'
  };

  private de: object = {
    'RESERVATION_CREATION': 'Reservierung erstellen',
    'RESERVATION_CREATION_DESC': 'Reservierung erstellen'
  };

  private en: object = {
    'RESERVATION_CREATION': 'Creating a reservation',
    'RESERVATION_CREATION_DESC': 'Creating a reservation'

  };
  private ru: object = {
    'RESERVATION_CREATION': 'Создание бронирования',
    'RESERVATION_CREATION_DESC': 'Создание бронирования'
  };

  private pl: object = {
    'RESERVATION_CREATION': 'Tworzenie rezerwacji',
    'RESERVATION_CREATION_DESC': 'Tworzenie rezerwacji'
  };
  private sk: object = {
    'RESERVATION_CREATION': 'Vytvorenie rezervácie',
    'RESERVATION_CREATION_DESC': 'Vytvorenie rezervácie'
  };

}
