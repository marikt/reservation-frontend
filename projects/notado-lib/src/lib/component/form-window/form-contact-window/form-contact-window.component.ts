import {Component, OnInit, ViewChild} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {FormsModule, NgModel} from '@angular/forms';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {NgxMaskDirective} from 'ngx-mask';
import {PreventDeletePrefixDirective} from './prevent-delete-prefix-directive';
import {Api} from '../../../enum/api';

@Component({
  selector: 'app-form-contact-window',
  templateUrl: './form-contact-window.component.html',
  styleUrls: ['./form-contact-window.component.scss'],
  imports: [
    TranslateModule,
    FormsModule,
    NgIf,
    NgxMaskDirective,
    PreventDeletePrefixDirective
  ],
  standalone: true
})
export class FormContactWindowComponent extends MyForm implements OnInit {
  @ViewChild('email') public emailInput: NgModel;
  @ViewChild('name') public nameInput: NgModel;
  @ViewChild('phoneComponent') public phoneInput: NgModel;
  public phone: string;

  public dynamicMask: string = '(+000) 000-000-000';
  public phonePrefix = [
    {code: '880', lang: 'bd', flag: 'bd'},
    {code: '351', lang: 'pt', flag: 'pt'},
    {code: '964', lang: 'iq', flag: 'iq'},
    {code: '674', lang: 'nr', flag: 'nr'},
    {code: '30', lang: 'gr', flag: 'gr'},
    {code: '378', lang: 'sm', flag: 'sm'},
    {code: '597', lang: 'sr', flag: 'sr'},
    {code: '39', lang: 'it', flag: 'it'},
    {code: '234', lang: 'ng', flag: 'ng'},
    {code: '993', lang: 'tm', flag: 'tm'},
    {code: '352', lang: 'lu', flag: 'lu'},
    {code: '679', lang: 'fj', flag: 'fj'},
    {code: '680', lang: 'pw', flag: 'pw'},
    {code: '973', lang: 'bh', flag: 'bh'},
    {code: '41', lang: 'ch', flag: 'ch'},
    {code: '49', lang: 'de', flag: 'de'},
    {code: '20', lang: 'eg', flag: 'eg'},
    {code: '598', lang: 'uy', flag: 'uy'},
    {code: '387', lang: 'ba', flag: 'ba'},
    {code: '506', lang: 'cr', flag: 'cr'},
    {code: '36', lang: 'hu', flag: 'hu'},
    {code: '62', lang: 'id', flag: 'id'},
    {code: '260', lang: 'zm', flag: 'zm'},
    {code: '31', lang: 'nl', flag: 'nl'},
    {code: '970', lang: 'ps', flag: 'ps'},
    {code: '45', lang: 'dk', flag: 'dk'},
    {code: '98', lang: 'ir', flag: 'ir'},
    {code: '420', lang: 'cs', flag: 'cz'},
    {code: '213', lang: 'dz', flag: 'dz'},
    {code: '594', lang: 'gf', flag: 'gf'},
    {code: '33', lang: 'fr', flag: 'fr'},
    {code: '93', lang: 'af', flag: 'af'},
    {code: '975', lang: 'bt', flag: 'bt'},
    {code: '503', lang: 'sv', flag: 'sv'},
    {code: '216', lang: 'tn', flag: 'tn'},
    {code: '52', lang: 'mx', flag: 'mx'},
    {code: '687', lang: 'nc', flag: 'nc'},
    {code: '27', lang: 'za', flag: 'za'},
    {code: '994', lang: 'az', flag: 'az'},
    {code: '504', lang: 'hn', flag: 'hn'},
    {code: '1', lang: 'us', flag: 'us'},
    {code: '372', lang: 'ee', flag: 'ee'},
    {code: '358', lang: 'fi', flag: 'fi'},
    {code: '962', lang: 'jo', flag: 'jo'},
    {code: '960', lang: 'mv', flag: 'mv'},
    {code: '386', lang: 'si', flag: 'si'},
    {code: '686', lang: 'ki', flag: 'ki'},
    {code: '376', lang: 'ad', flag: 'ad'},
    {code: '676', lang: 'to', flag: 'to'},
    {code: '375', lang: 'by', flag: 'by'},
    {code: '688', lang: 'tv', flag: 'tv'},
    {code: '256', lang: 'ug', flag: 'ug'},
    {code: '691', lang: 'fm', flag: 'fm'},
    {code: '95', lang: 'mm', flag: 'mm'},
    {code: '509', lang: 'ht', flag: 'ht'},
    {code: '996', lang: 'kg', flag: 'kg'},
    {code: '34', lang: 'es', flag: 'es'},
    {code: '356', lang: 'mt', flag: 'mt'},
    {code: '682', lang: 'ck', flag: 'ck'},
    {code: '421', lang: 'sk', flag: 'sk'},
    {code: '255', lang: 'tz', flag: 'tz'},
    {code: '251', lang: 'et', flag: 'et'},
    {code: '46', lang: 'se', flag: 'se'},
    {code: '94', lang: 'lk', flag: 'lk'},
    {code: '258', lang: 'mz', flag: 'mz'},
    {code: '501', lang: 'bz', flag: 'bz'},
    {code: '592', lang: 'gy', flag: 'gy'},
    {code: '689', lang: 'pf', flag: 'pf'},
    {code: '32', lang: 'be', flag: 'be'},
    {code: '976', lang: 'mn', flag: 'mn'},
    {code: '86', lang: 'cn', flag: 'cn'},
    {code: '995', lang: 'ge', flag: 'ge'},
    {code: '507', lang: 'pa', flag: 'pa'},
    {code: '43', lang: 'at', flag: 'at'},
    {code: '61', lang: 'au', flag: 'au'},
    {code: '353', lang: 'ie', flag: 'ie'},
    {code: '371', lang: 'lv', flag: 'lv'},
    {code: '685', lang: 'ws', flag: 'ws'},
    {code: '91', lang: 'in', flag: 'in'},
    {code: '683', lang: 'nu', flag: 'nu'},
    {code: '998', lang: 'uz', flag: 'uz'},
    {code: '389', lang: 'mk', flag: 'mk'},
    {code: '63', lang: 'ph', flag: 'ph'},
    {code: '218', lang: 'ly', flag: 'ly'},
    {code: '681', lang: 'wf', flag: 'wf'},
    {code: '850', lang: 'kp', flag: 'kp'},
    {code: '47', lang: 'no', flag: 'no'},
    {code: '961', lang: 'lb', flag: 'lb'},
    {code: '90', lang: 'tr', flag: 'tr'},
    {code: '81', lang: 'jp', flag: 'jp'},
    {code: '230', lang: 'mu', flag: 'mu'},
    {code: '64', lang: 'nz', flag: 'nz'},
    {code: '678', lang: 'vu', flag: 'vu'},
    {code: '992', lang: 'tj', flag: 'tj'},
    {code: '380', lang: 'ua', flag: 'ua'},
    {code: '82', lang: 'kr', flag: 'kr'},
    {code: '675', lang: 'pg', flag: 'pg'},
    {code: '212', lang: 'ma', flag: 'ma'},
    {code: '595', lang: 'py', flag: 'py'},
    {code: '254', lang: 'ke', flag: 'ke'},
    {code: '55', lang: 'br', flag: 'br'},
    {code: '692', lang: 'mh', flag: 'mh'},
    {code: '690', lang: 'tk', flag: 'tk'},
    {code: '370', lang: 'lt', flag: 'lt'},
    {code: '593', lang: 'ec', flag: 'ec'},
    {code: '965', lang: 'kw', flag: 'kw'},
    {code: '971', lang: 'ae', flag: 'ae'},
    {code: '591', lang: 'bo', flag: 'bo'},
    {code: '977', lang: 'np', flag: 'np'},
    {code: '505', lang: 'ni', flag: 'ni'},
    {code: '673', lang: 'bn', flag: 'bn'},
    {code: '672', lang: 'nf', flag: 'nf'},
    {code: '48', lang: 'pl', flag: 'pl'},
    {code: '263', lang: 'zw', flag: 'zw'},
    {code: '677', lang: 'sb', flag: 'sb'},
    {code: '233', lang: 'gh', flag: 'gh'},
    {code: '596', lang: 'mq', flag: 'mq'},
    {code: '502', lang: 'gt', flag: 'gt'},
    {code: '966', lang: 'sa', flag: 'sa'},
    {code: '44', lang: 'gb', flag: 'gb'},
    {code: '92', lang: 'pk', flag: 'pk'},
    {code: '963', lang: 'sy', flag: 'sy'},
    {code: '974', lang: 'qa', flag: 'qa'}
  ];

  private existingAttendeeEmails: string[] = [];
  private blacklistedEmails: string[] = [];
  private whitelistedEmails: string[] = [];
  public emailAlreadyExists: boolean = false;
  public emailBlacklisted: boolean = false;
  public emailNotWhitelisted: boolean = false;
  public whitelistEnabled: boolean = false;


  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService
  ) {
    super(formService, broadcastService, http, metaService, languageService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.fetchExistingAttendeeEmails();
    this.fetchBlacklistedEmails();
    this.fetchWhitelistedEmails();
    if (this.languageService.language === 'cs') {
      this.phone = '(+420)';
      this.dynamicMask = '(+000) 000-000-000';
    } else if (this.languageService.language === 'sk') {
      this.phone = '(+421)';
      this.dynamicMask = '(+000) 000-000-000';
    } else if (this.languageService.language === 'pl') {
      this.phone = '(+48)';
      this.dynamicMask = '(+00) 000-000-000';
    } else {
      this.phone = '(+';
    }
    if (this.formService.calendarEvent.phone && this.formService.calendarEvent.phone.length > 0) {
      this.phone = this.formService.calendarEvent.phone.replace(/\+/, ''); // remove plus
    }
  }

  public isValidPhonePrefix(phone: string): boolean {
    return this.phonePrefix.some(country => phone.startsWith(country.code));
  }

  public updateMask(): void {
    const country = this.phonePrefix.find(c => this.phone.startsWith(c.code));
    if (country.code === '420' || country.code === '421') {
      this.dynamicMask = '(+000) 000-000-000';
      return;
    }

    if (country.code === '48') {
      this.dynamicMask = '(+00) 000-000-000';
      return;
    }

    if (country) {
      const prefixLength = country.code.length;
      switch (prefixLength) {
        case 1:
          this.dynamicMask = '(+0) 0*';
          break;
        case 2:
          this.dynamicMask = '(+00) 0*';
          break;
        case 3:
          this.dynamicMask = '(+000) 0*';
          break;
        case 4:
          this.dynamicMask = '(+0000) 0*';
          break;
        default:
          this.dynamicMask = '(+00) 0*';
          break;
      }
    } else {
      this.dynamicMask = '(+00) 0*';
    }
  }

  public onPhoneChange(): void {
    this.updateMask();
  }

  public getFlagClass(phone: string): string {
    const country = this.phonePrefix.find(c => phone.startsWith(c.code));
    return country ? `fi-${country.flag}` : '';
  }

  public validate(): boolean {
    this.checkEmailExists();
    this.checkEmailBlackList();
    this.checkEmailWhiteList();

    if (this.emailAlreadyExists || this.emailBlacklisted || (this.whitelistEnabled && this.emailNotWhitelisted)) {
      return false;
    }

    if (this.window.config && this.window.config.phone) {
      this.formService.calendarEvent.phone = '+' + this.phone;
      return this.emailInput.valid && this.nameInput.valid && this.phoneInput.valid && this.isValidEmail();
    }
    return this.emailInput.valid && this.nameInput.valid && this.isValidEmail();
  }

  public isValidEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const email = this.formService.calendarEvent.email;
    if (!emailPattern.test(email)) {
      return false;
    }
    const blacklistedDomains = ['gmail.cz', 'xx.', '.czz', '.comcom', 'seznem.cz', 'setnam.cz'];
    for (const domain of blacklistedDomains) {
      if (email.includes(domain)) {
        return false;
      }
    }
    return true;
  }

  public checkEmailExists(): void {
    if (this.formService.calendarEvent && this.formService.calendarEvent.email) {
      const currentEmail = this.formService.calendarEvent.email.trim().toLowerCase();
      this.emailAlreadyExists = this.existingAttendeeEmails.some(
        email => email.trim().toLowerCase() === currentEmail
      );

      if (this.emailInput) {
        this.emailInput.control.updateValueAndValidity();
      }
    } else {
      this.emailAlreadyExists = false;
    }
  }

  public checkEmailBlackList(): void {
    if (this.formService.calendarEvent && this.formService.calendarEvent.email) {
      const currentEmail = this.formService.calendarEvent.email.trim().toLowerCase();
      const currentEmailHash = this.generateSHA256Hash(currentEmail);

      this.emailBlacklisted = this.blacklistedEmails.some(
        email => email.trim().toLowerCase() === currentEmailHash
      );
      if (this.emailInput) {
        this.emailInput.control.updateValueAndValidity();
      }
    } else {
      this.emailBlacklisted = false;
    }
  }

  public checkEmailWhiteList(): void {
    if (!this.whitelistEnabled) {
      this.emailNotWhitelisted = false;
      return;
    }

    if (this.formService.calendarEvent && this.formService.calendarEvent.email) {
      const currentEmail = this.formService.calendarEvent.email.trim().toLowerCase();
      const currentEmailHash = this.generateSHA256Hash(currentEmail);

      // If whitelist is enabled, check if the email is in the whitelist
      this.emailNotWhitelisted = !this.whitelistedEmails.some(
        email => email.trim().toLowerCase() === currentEmailHash
      );

      if (this.emailInput) {
        this.emailInput.control.updateValueAndValidity();
      }
    } else {
      this.emailNotWhitelisted = true;
    }
  }

  private fetchExistingAttendeeEmails(): void {
    try {
      if (this.formService.calendarEvent && this.formService.business) {
        const businessId = this.formService.business.id;
        this.http.post(Api.CALENDAR_EVENT + '/attendees/emails/' + businessId, this.formService.calendarEvent,
          (emails: string[]) => {
            this.existingAttendeeEmails = emails || [];
          });
      }
    } catch (error) {
      console.error('Error fetching existing attendee emails:', error);
      this.existingAttendeeEmails = [];
    }
  }

  private fetchBlacklistedEmails(): void {
    try {
      if (this.formService.business &&
        this.formService.business.googleContactConnected &&
        this.formService.business.blacklistLabelId) {
        const labelId = this.formService.business.blacklistLabelId.replace('/', '_');
        this.http.get(Api.CUSTOMER + '/email/' + this.formService.business.id + '/' + labelId, (blacklistedEmails) => {
            this.blacklistedEmails = blacklistedEmails;
          }
        );
      }
    } catch (error) {
      console.error('Error fetching blacklisted emails:', error);
      this.blacklistedEmails = [];
    }
  }

  private fetchWhitelistedEmails(): void {
    try {
      if (this.formService.business &&
        this.formService.business.googleContactConnected &&
        this.formService.business.whitelistLabelId) {
        // If whitelist label is set, enable whitelist functionality
        this.whitelistEnabled = true;

        const labelId = this.formService.business.whitelistLabelId.replace('/', '_');
        this.http.get(Api.CUSTOMER + '/email/' + this.formService.business.id + '/' + labelId, (whitelistedEmails) => {
            this.whitelistedEmails = whitelistedEmails;
          }
        );
      } else {
        // If no whitelist label is set, disable whitelist functionality
        this.whitelistEnabled = false;
        this.whitelistedEmails = [];
      }
    } catch (error) {
      console.error('Error fetching whitelisted emails:', error);
      this.whitelistedEmails = [];
      this.whitelistEnabled = false;
    }
  }

  private generateSHA256Hash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (31 * hash + str.charCodeAt(i)) | 0; // Use bitwise OR to ensure 32-bit integer
    }
    return hash + '';
  }

}
