import {Injectable} from '@angular/core';
import {LanguageService} from './language.service';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  /**
   * this is not stopped by HttpService
   */
  public isShowUnstoppable: boolean = false;
  public isShow: boolean = false;
  public reasonMessage: string;
  public icon: string;
  public isShowArray: boolean[] = [];
  public loadingProgress: number = 0;

  constructor(public languageService: LanguageService,
  ) {
  }

  public show(reasonMessage?: string, icon?: string): void {
    if (reasonMessage) {
      // do not override msg
      this.reasonMessage = this.translate(reasonMessage);
    }

    if (icon) {
      // do not override icon
      this.icon = icon;
    }

    this.isShowArray.push(true);
    this.isShow = true

    setTimeout(
      () => {
        this.hideAll();
      }, 5000
    );
  }

  public hide(): void {
    this.isShowArray.pop();
    if (this.isShowArray.length === 0) {
      setTimeout(
        () => {
          this.isShow = false;
          this.reasonMessage = null;
          this.icon = null;
        }, 100
      );
    }
  }

  public hideAll(): void {
    this.isShowArray = [];
    setTimeout(
      () => {
        this.isShow = false;
        this.reasonMessage = null;
        this.icon = null;
      }, 100
    );
  }

  private translate(title: string): string {
    if (!title) {
      return;
    }
    if (!title.match('LOADING.')) {
      return title;
    }
    title = title.replace('LOADING.', '');
    let lang = this.languageService.language;
    if (!lang) {
      lang = this.languageService.languageDefault;
    }

    switch (lang) {
      case 'cs':
        return this.cs[title];
      case 'en':
        return this.en[title];
      case 'pl':
        return this.pl[title];
      case 'sk':
        return this.sk[title];
      case 'de':
        return this.de[title];
      case 'es':
        return this.es[title];
    }
  }

  private cs: object = {
    'CREATING_BUSINESS': 'Vytvářím nový podnik ...',
    'PAYMENT': 'Zpracovávám platbu ...',
    'CREATING_WORKER': 'Vytvářím nového pracovníka ...',
    'CREATING_DEVICE': 'Vytvářím nové zařízení ...',
    'CONNECTION_TO_CALENDAR': 'Připravuji připojení s google kalendářem ...',
    'PAYMENT_PORTAL': 'Přesměrovávám na platební portál ...',
    'YOUR_WEB_AS_BACKGROUND': 'Připravuji Vaše webové stránky jako pozadí',
    'CONNECTION_TO_CALENDAR_SUCCESS': 'Byli jste úspěšně propojeni s google kalendářem.',
    'CONNECTION_TO_CALENDAR_FAILED': 'Něco ne nepodařilo. Zkuste se prosím s kalendářem propojit znovu.'
  };

  private en: object = {
    'CREATING_BUSINESS': 'Creating new business ...',
    'PAYMENT': 'Processing payment ...',
    'CREATING_WORKER': 'Creating new employee ...',
    'CREATING_DEVICE': 'Creating new facility ...',
    'CONNECTION_TO_CALENDAR': 'Preparing to connect to Google Calendar ...',
    'PAYMENT_PORTAL': 'Redirecting to payment portal ...',
    'YOUR_WEB_AS_BACKGROUND': 'Preparing your website as a background',
    'CONNECTION_TO_CALENDAR_SUCCESS': 'You have been successfully linked to Google Calendar.',
    'CONNECTION_TO_CALENDAR_FAILED': 'Something went wrong. Please try reconnecting to the calendar.'
  };

  private de: object = {
    'CREATING_BUSINESS': 'Neues Geschäft erstellen ...',
    'CREATING_WORKER': 'Neuen Mitarbeiter anlegen ...',
    'CREATING_DEVICE': 'Neue Einrichtung erstellen ...',
    'CONNECTION_TO_CALENDAR': 'Verbindung mit Google Kalender wird vorbereitet ...',
    'PAYMENT_PORTAL': 'Weiterleitung zum Zahlungsportal ...',
    'YOUR_WEB_AS_BACKGROUND': 'Vorbereitung Ihrer Website als Hintergrund',
    'CONNECTION_TO_CALENDAR_SUCCESS': 'Sie wurden erfolgreich mit Google Kalender verknüpft.',
    'CONNECTION_TO_CALENDAR_FAILED': 'Etwas ist schief gelaufen. Bitte versuchen Sie erneut, sich mit dem Kalender zu verbinden.'
  };

  private pl: object = {
    'CREATING_BUSINESS': 'Tworzę nową firmę ...',
    'CREATING_DEVICE': 'Tworzenie nowego obiektu ...',
    'CREATING_WORKER': 'Tworzenie nowego pracownika ...',
    'CONNECTION_TO_CALENDAR': 'Przygotowuję się do połączenia z Kalendarzem Google ...',
    'PAYMENT_PORTAL': 'Przekierowanie do portalu płatności ...',
    'YOUR_WEB_AS_BACKGROUND': 'Przygotowanie witryny internetowej jako tła',
    'CONNECTION_TO_CALENDAR_SUCCESS': 'Pomyślnie połączono Cię z Kalendarzem Google.',
    'CONNECTION_TO_CALENDAR_FAILED': 'Coś poszło nie tak. Spróbuj ponownie połączyć się z Kalendarzem Google'
  };

  private sk: object = {
    'CREATING_BUSINESS': 'Vytváranie nových firiem ...',
    'CREATING_DEVICE': 'Vytvorenie nového zariadenia ...',
    'CREATING_WORKER': 'Vytvorenie nového zamestnanca ...',
    'CONNECTION_TO_CALENDAR': 'Pripravuje sa pripojenie k Kalendáru Google ...',
    'PAYMENT_PORTAL': 'Prebieha presmerovanie na platobný portál ...',
    'YOUR_WEB_AS_BACKGROUND': 'Príprava Vášho webu ako pozadia',
    'CONNECTION_TO_CALENDAR_SUCCESS': 'Boli ste úspešne prepojení s Kalendárom Google.',
    'CONNECTION_TO_CALENDAR_FAILED': 'Niečo sa pokazilo. Skúste sa znova pripojiť ku kalendáru.'
  };

  private es: object = {
    'CREATING_BUSINESS': 'Creando nuevo negocio...',
    'CREATING_WORKER': 'Creando nuevo empleado...',
    'CREATING_DEVICE': 'Creando nueva instalación...',
    'CONNECTION_TO_CALENDAR': 'Preparándose para conectarse a Google Calendar...',
    'PAYMENT_PORTAL': 'Redireccionando al portal de pago...',
    'YOUR_WEB_AS_BACKGROUND': 'Preparando tu sitio web como fondo',
    'CONNECTION_TO_CALENDAR_SUCCESS': 'Se ha vinculado con éxito a Google Calendar',
    'CONNECTION_TO_CALENDAR_FAILED': 'Algo salió mal. Intenta volver a conectarte al calendario'
  };

  public startProgress(durationInMiliSeconds?: number): void {
    const totalSteps = 100;
    const duration = durationInMiliSeconds ?? 5000;
    const interval = duration / totalSteps;
    this.loadingProgress = 0;
    const intervalId = setInterval(() => {
      if (this.loadingProgress >= totalSteps) {
        this.loadingProgress = 0;
        clearInterval(intervalId);
      } else {
        this.loadingProgress++;
      }
    }, interval);
  }
}
