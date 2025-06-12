import {debounceTime, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {NotificationTypeEnum} from '../util/notification-type-enum';
import {NotificationWhenEnum} from '../util/notification-when-enum';
import {NotificationRecipientEnum} from '../util/notification-recipient-enum';
import {IntegrationType} from '../util/integration-type';

@Injectable({
  providedIn: 'root'
})
export class TypeaheadService {

  public businessTimePrefixHours: number[] = [];

  public durationHours: number[] = [];
  public durationMinutes: number[] = [];
  public timeWindowSize: number[] = [];

  public recipients: any[] = [];
  public notificationTypes: any[] = [];
  public notificationWhen: any[] = [];
  public providers: any[] = [];
  public timezone: any[] = [
    'Europe/Andorra',
    'Asia/Dubai',
    'Asia/Kabul',
    'Europe/Tirane',
    'Asia/Yerevan',
    'Antarctica/Casey',
    'Antarctica/Davis',
    'Antarctica/DumontDUrville',
    'Antarctica/Mawson',
    'Antarctica/Palmer',
    'Antarctica/Rothera',
    'Antarctica/Syowa',
    'Antarctica/Troll',
    'Antarctica/Vostok',
    'America/Argentina/Buenos_Aires',
    'America/Argentina/Cordoba',
    'America/Argentina/Salta',
    'America/Argentina/Jujuy',
    'America/Argentina/Tucuman',
    'America/Argentina/Catamarca',
    'America/Argentina/La_Rioja',
    'America/Argentina/San_Juan',
    'America/Argentina/Mendoza',
    'America/Argentina/San_Luis',
    'America/Argentina/Rio_Gallegos',
    'America/Argentina/Ushuaia',
    'Pacific/Pago_Pago',
    'Europe/Vienna',
    'Australia/Lord_Howe',
    'Antarctica/Macquarie',
    'Australia/Hobart',
    'Australia/Currie',
    'Australia/Melbourne',
    'Australia/Sydney',
    'Australia/Broken_Hill',
    'Australia/Brisbane',
    'Australia/Lindeman',
    'Australia/Adelaide',
    'Australia/Darwin',
    'Australia/Perth',
    'Australia/Eucla',
    'Asia/Baku',
    'America/Barbados',
    'Asia/Dhaka',
    'Europe/Brussels',
    'Europe/Sofia',
    'Atlantic/Bermuda',
    'Asia/Brunei',
    'America/La_Paz',
    'America/Noronha',
    'America/Belem',
    'America/Fortaleza',
    'America/Recife',
    'America/Araguaina',
    'America/Maceio',
    'America/Bahia',
    'America/Sao_Paulo',
    'America/Campo_Grande',
    'America/Cuiaba',
    'America/Santarem',
    'America/Porto_Velho',
    'America/Boa_Vista',
    'America/Manaus',
    'America/Eirunepe',
    'America/Rio_Branco',
    'America/Nassau',
    'Asia/Thimphu',
    'Europe/Minsk',
    'America/Belize',
    'America/St_Johns',
    'America/Halifax',
    'America/Glace_Bay',
    'America/Moncton',
    'America/Goose_Bay',
    'America/Blanc-Sablon',
    'America/Toronto',
    'America/Nipigon',
    'America/Thunder_Bay',
    'America/Iqaluit',
    'America/Pangnirtung',
    'America/Atikokan',
    'America/Winnipeg',
    'America/Rainy_River',
    'America/Resolute',
    'America/Rankin_Inlet',
    'America/Regina',
    'America/Swift_Current',
    'America/Edmonton',
    'America/Cambridge_Bay',
    'America/Yellowknife',
    'America/Inuvik',
    'America/Creston',
    'America/Dawson_Creek',
    'America/Fort_Nelson',
    'America/Vancouver',
    'America/Whitehorse',
    'America/Dawson',
    'Indian/Cocos',
    'Europe/Zurich',
    'Africa/Abidjan',
    'Pacific/Rarotonga',
    'America/Santiago',
    'America/Punta_Arenas',
    'Pacific/Easter',
    'Asia/Shanghai',
    'Asia/Urumqi',
    'America/Bogota',
    'America/Costa_Rica',
    'America/Havana',
    'Atlantic/Cape_Verde',
    'America/Curacao',
    'Indian/Christmas',
    'Asia/Nicosia',
    'Asia/Famagusta',
    'Europe/Prague',
    'Europe/Berlin',
    'Europe/Copenhagen',
    'America/Santo_Domingo',
    'Africa/Algiers',
    'America/Guayaquil',
    'Pacific/Galapagos',
    'Europe/Tallinn',
    'Africa/Cairo',
    'Africa/El_Aaiun',
    'Europe/Madrid',
    'Africa/Ceuta',
    'Atlantic/Canary',
    'Europe/Helsinki',
    'Pacific/Fiji',
    'Atlantic/Stanley',
    'Pacific/Chuuk',
    'Pacific/Pohnpei',
    'Pacific/Kosrae',
    'Atlantic/Faroe',
    'Europe/Paris',
    'Europe/London',
    'Asia/Tbilisi',
    'America/Cayenne',
    'Africa/Accra',
    'Europe/Gibraltar',
    'America/Godthab',
    'America/Danmarkshavn',
    'America/Scoresbysund',
    'America/Thule',
    'Europe/Athens',
    'Atlantic/South_Georgia',
    'America/Guatemala',
    'Pacific/Guam',
    'Africa/Bissau',
    'America/Guyana',
    'Asia/Hong_Kong',
    'America/Tegucigalpa',
    'America/Port-au-Prince',
    'Europe/Budapest',
    'Asia/Jakarta',
    'Asia/Pontianak',
    'Asia/Makassar',
    'Asia/Jayapura',
    'Europe/Dublin',
    'Asia/Jerusalem',
    'Asia/Kolkata',
    'Indian/Chagos',
    'Asia/Baghdad',
    'Asia/Tehran',
    'Atlantic/Reykjavik',
    'Europe/Rome',
    'America/Jamaica',
    'Asia/Amman',
    'Asia/Tokyo',
    'Africa/Nairobi',
    'Asia/Bishkek',
    'Pacific/Tarawa',
    'Pacific/Enderbury',
    'Pacific/Kiritimati',
    'Asia/Pyongyang',
    'Asia/Seoul',
    'Asia/Almaty',
    'Asia/Qyzylorda',
    'Asia/Qostanay',
    'Asia/Aqtobe',
    'Asia/Aqtau',
    'Asia/Atyrau',
    'Asia/Oral',
    'Asia/Beirut',
    'Asia/Colombo',
    'Africa/Monrovia',
    'Europe/Vilnius',
    'Europe/Luxembourg',
    'Europe/Riga',
    'Africa/Tripoli',
    'Africa/Casablanca',
    'Europe/Monaco',
    'Europe/Chisinau',
    'Pacific/Majuro',
    'Pacific/Kwajalein',
    'Asia/Yangon',
    'Asia/Ulaanbaatar',
    'Asia/Hovd',
    'Asia/Choibalsan',
    'Asia/Macau',
    'America/Martinique',
    'Europe/Malta',
    'Indian/Mauritius',
    'Indian/Maldives',
    'America/Mexico_City',
    'America/Cancun',
    'America/Merida',
    'America/Monterrey',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Chihuahua',
    'America/Ojinaga',
    'America/Hermosillo',
    'America/Tijuana',
    'America/Bahia_Banderas',
    'Asia/Kuala_Lumpur',
    'Asia/Kuching',
    'Africa/Maputo',
    'Africa/Windhoek',
    'Pacific/Noumea',
    'Pacific/Norfolk',
    'Africa/Lagos',
    'America/Managua',
    'Europe/Amsterdam',
    'Europe/Oslo',
    'Asia/Kathmandu',
    'Pacific/Nauru',
    'Pacific/Niue',
    'Pacific/Auckland',
    'Pacific/Chatham',
    'America/Panama',
    'America/Lima',
    'Pacific/Tahiti',
    'Pacific/Marquesas',
    'Pacific/Gambier',
    'Pacific/Port_Moresby',
    'Pacific/Bougainville',
    'Asia/Manila',
    'Asia/Karachi',
    'Europe/Warsaw',
    'America/Miquelon',
    'Pacific/Pitcairn',
    'America/Puerto_Rico',
    'Asia/Gaza',
    'Asia/Hebron',
    'Europe/Lisbon',
    'Atlantic/Madeira',
    'Atlantic/Azores',
    'Pacific/Palau',
    'America/Asuncion',
    'Asia/Qatar',
    'Indian/Reunion',
    'Europe/Bucharest',
    'Europe/Belgrade',
    'Europe/Kaliningrad',
    'Europe/Moscow',
    'Europe/Simferopol',
    'Europe/Kirov',
    'Europe/Astrakhan',
    'Europe/Volgograd',
    'Europe/Saratov',
    'Europe/Ulyanovsk',
    'Europe/Samara',
    'Asia/Yekaterinburg',
    'Asia/Omsk',
    'Asia/Novosibirsk',
    'Asia/Barnaul',
    'Asia/Tomsk',
    'Asia/Novokuznetsk',
    'Asia/Krasnoyarsk',
    'Asia/Irkutsk',
    'Asia/Chita',
    'Asia/Yakutsk',
    'Asia/Khandyga',
    'Asia/Vladivostok',
    'Asia/Ust-Nera',
    'Asia/Magadan',
    'Asia/Sakhalin',
    'Asia/Srednekolymsk',
    'Asia/Kamchatka',
    'Asia/Anadyr',
    'Asia/Riyadh',
    'Pacific/Guadalcanal',
    'Indian/Mahe',
    'Africa/Khartoum',
    'Europe/Stockholm',
    'Asia/Singapore',
    'America/Paramaribo',
    'Africa/Juba',
    'Africa/Sao_Tome',
    'America/El_Salvador',
    'Asia/Damascus',
    'America/Grand_Turk',
    'Africa/Ndjamena',
    'Indian/Kerguelen',
    'Asia/Bangkok',
    'Asia/Dushanbe',
    'Pacific/Fakaofo',
    'Asia/Dili',
    'Asia/Ashgabat',
    'Africa/Tunis',
    'Pacific/Tongatapu',
    'Europe/Istanbul',
    'America/Port_of_Spain',
    'Pacific/Funafuti',
    'Asia/Taipei',
    'Europe/Kiev',
    'Europe/Uzhgorod',
    'Europe/Zaporozhye',
    'Pacific/Wake',
    'America/New_York',
    'America/Detroit',
    'America/Kentucky/Louisville',
    'America/Kentucky/Monticello',
    'America/Indiana/Indianapolis',
    'America/Indiana/Vincennes',
    'America/Indiana/Winamac',
    'America/Indiana/Marengo',
    'America/Indiana/Petersburg',
    'America/Indiana/Vevay',
    'America/Chicago',
    'America/Indiana/Tell_City',
    'America/Indiana/Knox',
    'America/Menominee',
    'America/North_Dakota/Center',
    'America/North_Dakota/New_Salem',
    'America/North_Dakota/Beulah',
    'America/Denver',
    'America/Boise',
    'America/Phoenix',
    'America/Los_Angeles',
    'America/Anchorage',
    'America/Juneau',
    'America/Sitka',
    'America/Metlakatla',
    'America/Yakutat',
    'America/Nome',
    'America/Adak',
    'Pacific/Honolulu',
    'America/Montevideo',
    'Asia/Samarkand',
    'Asia/Tashkent',
    'America/Caracas',
    'Asia/Ho_Chi_Minh',
    'Pacific/Efate',
    'Pacific/Wallis',
    'Pacific/Apia',
    'Africa/Johannesburg'
  ];

  public googleFonts: string[] = [
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Oswald',
    'Raleway',
    'Poppins',
    'Source Sans Pro',
    'Slabo 27px',
    'Noto Sans',
    'PT Sans',
    'Merriweather',
    'Ubuntu',
    'Playfair Display',
    'Rubik',
    'Work Sans',
    'Nunito',
    'Inter',
    'Mukta',
    'Fira Sans',
    'Josefin Sans',
    'Cabin',
    'Quicksand',
    'Teko',
    'Arimo',
    'Hind',
    'Signika',
    'Titillium Web',
    'Mulish',
    'Dosis',
    'Cairo',
    'Asap',
    'Anton',
    'Barlow',
    'Bebas Neue',
    'Zilla Slab',
    'Exo 2',
    'Manrope',
    'Heebo',
    'Abel',
    'Varela Round',
    'Karla',
    'IBM Plex Sans',
    'DM Sans',
    'Ropa Sans',
    'Lora',
    'Archivo',
    'Domine',
    'Assistant',
    'Inconsolata',
  ];

  constructor(
    public translate: TranslateService
  ) {
    this.reset();
  }

  public searchProviderTypes = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
          return this.providers;
        }
      ),);
  };

  public searchTimezone = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
        return term.length < 1 ? [] : this.timezone.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)

        // return this.timezone;
        }
      ));
  };

  public searchRecipients = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
          return this.recipients;
        }
      ),);
  };

  public searchDurationHours = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
          return this.durationHours;
        }
      ),);
  };

  public searchTimeWindowSize = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
          return this.timeWindowSize;
        }
      ),);
  };

  public searchBusinessTimePrefixHours = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
          return this.businessTimePrefixHours;
        }
      ),);
  };

  public searchDurationMinutes = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
          return this.durationMinutes;
        }
      ),);
  };

  public showDropDown(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }


  public searchNotificationTypes = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
          return this.notificationTypes;
        }
      ),);
  };

  public searchNotificationWhen = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
          return this.notificationWhen;
        }
      ),);
  };

  public searchGoogleFonts = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(20),
      map(term => {
        return this.googleFonts;
      })
    );
  };




  private loadDurationHours() {
    this.durationHours.push(0);
    this.durationHours.push(1);
    this.durationHours.push(2);
    this.durationHours.push(3);
    this.durationHours.push(4);
    this.durationHours.push(5);
    this.durationHours.push(6);
    this.durationHours.push(7);
    this.durationHours.push(8);
    this.durationHours.push(9);
    this.durationHours.push(10);
    this.durationHours.push(11);
    this.durationHours.push(12);
    this.durationHours.push(13);
    this.durationHours.push(14);
    this.durationHours.push(15);
    this.durationHours.push(16);
    this.durationHours.push(17);
    this.durationHours.push(18);
    this.durationHours.push(19);
    this.durationHours.push(20);
    this.durationHours.push(21);
    this.durationHours.push(22);
    this.durationHours.push(23);
    this.durationHours.push(24);
  }

  private loadBusinessTimePrefixHours() {
    this.durationHours.push(0);
    this.durationHours.push(1);
    this.durationHours.push(2);
    this.durationHours.push(3);
    this.durationHours.push(4);
    this.durationHours.push(5);
    this.durationHours.push(6);
    this.durationHours.push(7);
    this.durationHours.push(8);
    this.durationHours.push(9);
    this.durationHours.push(10);
    this.durationHours.push(11);
    this.durationHours.push(12);
    this.durationHours.push(13);
    this.durationHours.push(14);
    this.durationHours.push(15);
    this.durationHours.push(16);
    this.durationHours.push(17);
    this.durationHours.push(18);
    this.durationHours.push(19);
    this.durationHours.push(20);
    this.durationHours.push(21);
    this.durationHours.push(22);
    this.durationHours.push(23);
    this.durationHours.push(24);
    this.durationHours.push(25);
    this.durationHours.push(26);
    this.durationHours.push(27);
    this.durationHours.push(28);
    this.durationHours.push(29);
    this.durationHours.push(30);
    this.durationHours.push(31);
    this.durationHours.push(32);
    this.durationHours.push(33);
    this.durationHours.push(34);
    this.durationHours.push(35);
    this.durationHours.push(36);
    this.durationHours.push(37);
    this.durationHours.push(38);
    this.durationHours.push(39);
    this.durationHours.push(40);
    this.durationHours.push(41);
    this.durationHours.push(42);
    this.durationHours.push(43);
    this.durationHours.push(44);
    this.durationHours.push(45);
    this.durationHours.push(46);
    this.durationHours.push(47);
    this.durationHours.push(48);
  }

  private loadDurationMinutes() {
    this.durationMinutes.push(0);
    this.durationMinutes.push(5);
    this.durationMinutes.push(10);
    this.durationMinutes.push(15);
    this.durationMinutes.push(20);
    this.durationMinutes.push(25);
    this.durationMinutes.push(30);
    this.durationMinutes.push(35);
    this.durationMinutes.push(40);
    this.durationMinutes.push(45);
    this.durationMinutes.push(50);
    this.durationMinutes.push(55);
  }

  private loadTimeWindowSize() {
    this.durationMinutes.push(30);
    this.durationMinutes.push(60);
    this.durationMinutes.push(90);
    this.durationMinutes.push(120);
    this.durationMinutes.push(150);
    this.durationMinutes.push(180);
    this.durationMinutes.push(210);
    this.durationMinutes.push(240);
    this.durationMinutes.push(270);
    this.durationMinutes.push(300);
  }

  private loadNotificationTypes() {
    for (const key in NotificationTypeEnum) {
      this.notificationTypes.push(this.translate.instant('NOTIFICATION.' + key));
    }
  }

  private loadNotificationWhen() {
    for (const key in NotificationWhenEnum) {
      this.notificationWhen.push(this.translate.instant('NOTIFICATION.' + key));
    }
  }

  private loadRecipients() {
    for (const key in NotificationRecipientEnum) {
      this.recipients.push(this.translate.instant('NOTIFICATION.' + key));
    }
  }

  private loadProviders() {
    this.providers.push(IntegrationType.SMS_MANAGER.toLocaleLowerCase().replace('_', ' '));
    this.providers.push(IntegrationType.TWILIO.toLocaleLowerCase().replace('_', ' '));
  }

  public reset() {
    setTimeout(
      () => {
        this.durationHours = [];
        this.durationMinutes = [];
        this.recipients = [];
        this.notificationTypes = [];
        this.notificationWhen = [];
        this.providers = [];
        this.timeWindowSize = [];

        this.loadDurationHours();
        this.loadDurationMinutes();
        this.loadNotificationTypes();
        this.loadNotificationWhen();
        this.loadRecipients();
        this.loadProviders();
        this.loadBusinessTimePrefixHours();
        this.loadTimeWindowSize();
      },
      2000
    );
  }

}
