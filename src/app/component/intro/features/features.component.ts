import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../../../projects/notado-lib/src/lib/util/event.enum';
import {SetMeta} from '../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../service/meta.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class FeaturesComponent extends MySubscribable implements SetMeta {

  public environment: any;
  public features: Feature[];

  @Input('simple')
  public simple: boolean;

  constructor(
    public metaService: MetaService,
    public broadcastService: BroadcastService,
    public languageService: LanguageService
  ) {
    super(broadcastService);
    this.environment = environment;
    this.subscribe(Event.LANGUAGE_SWITCH, () => {
      this.setFeatures();
    });
  }

  ngOnInit(): void {
    this.setMeta();
    this.setFeatures();
  }

  public setFeatures(): void {
    this.features = [];
    this.features.push(new Feature('GOOGLE', 'fab fa-google', '/intro/' + this.languageService.language + '/management-on-google'));
    this.features.push(new Feature('CALENDAR_AVAILABILITY', 'fas fa-calendar-alt', '/intro/' + this.languageService.language + '/calendar-availability'));
    this.features.push(new Feature('NOTIFICATION', 'far fa-comment-dots', '/intro/' + this.languageService.language + '/notification'));
    this.features.push(new Feature('CUSTOMER', 'fas fa-users', '/intro/' + this.languageService.language + '/intro-google-contacts'));
    this.features.push(new Feature('CUSTOMIZABLE_MSG', 'fas fa-sliders-h', '/intro/' + this.languageService.language + '/customizable-msg'));
    this.features.push(new Feature('ATTENDEES', 'fas fa-user-plus', '/faq/' + this.languageService.language + '/attendees'));
    this.features.push(new Feature('INTEGRATE', 'fas fa-plug', '/intro/' + this.languageService.language + '/integration'));
    this.features.push(new Feature('PAYMENTS', 'fas fa-money-check', '/blog/' + this.languageService.language + '/payments-during-booking'));
    this.features.push(new Feature('EDIT_FORM', 'fas fa-edit', '/blog/' + this.languageService.language + '/configurable-booking-form'));
    this.features.push(new Feature('CUSTOM_SCHEDULE', 'far fa-clock', '/blog/' + this.languageService.language + '/neravidelna-pracovni-doba'));
    this.features.push(new Feature('SEASON_TICKET', 'fas fa-ticket-alt', '/blog/' + this.languageService.language + '/permanentky'));
    this.features.push(new Feature('KEYGURU', 'fas fa-key', '/blog/' + this.languageService.language + '/keyguru'));

    if (!this.simple) {
      this.features.push(new Feature('ONLINE_BOOKING', 'far fa-calendar-check', '/intro/' + this.languageService.language + '/online-reservation'));
      this.features.push(new Feature('SECURITY', 'fas fa-shield-alt', '/blog/' + this.languageService.language + '/reservation-system-and-security'));
      this.features.push(new Feature('FACEBOOK', 'fab fa-facebook'));
      this.features.push(new Feature('VOUCHERS', 'fas fa-gift', '/faq/' + this.languageService.language + '/voucher'));
      // this.features.push(new Feature('ZOOM', 'fas fa-headset', '/faq/' + this.languageService.language + '/zoom'));
    }
  }

  public setMeta(): void {
    if (!this.simple) {
      this.metaService.setMetaData('META.FEATURES');
    }
  }

}


export class Feature {
  public title: string;
  public icon: string;
  public link: string;

  constructor(title: string, icon: string, link?: string) {
    this.title = title;
    this.icon = icon;
    this.link = link;
  }
}
