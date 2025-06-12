import {Injectable} from '@angular/core';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {Notification} from '../model/notification';
import {NotificationSearchCriteria} from '../model/search/notification-search-criteria';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../projects/notado-lib/src/lib/service/language.service';
import cs from '../../assets/i18n/cs.json';
import en from '../../assets/i18n/en.json';
import pl from '../../assets/i18n/pl.json';
import sk from '../../assets/i18n/sk.json';
import de from '../../assets/i18n/de.json';
import es from '../../assets/i18n/es.json';
import {DashboardService} from './dashboard.service';
import {IntegrationType} from '../../../projects/notado-lib/src/lib/util/integration-type';
import {NotificationRecipientEnum} from '../../../projects/notado-lib/src/lib/util/notification-recipient-enum';
import {NotificationWhenEnum} from '../../../projects/notado-lib/src/lib/util/notification-when-enum';
import {NotificationTypeEnum} from '../../../projects/notado-lib/src/lib/util/notification-type-enum';

/**
 * Service holds data:
 *
 * business
 * template
 *
 *
 * is not currently active as I decided not to implement this feature now
 * to enable it please set feature.notification=true in app properties
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notifications: Notification[] = [];

  constructor(
    public http: HttpService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public dashboardService: DashboardService,
  ) {
  }

  public loadNotifications(): void {
    let searchCriteria: NotificationSearchCriteria = new NotificationSearchCriteria();
    searchCriteria.business = this.dashboardService.business.id;

    this.http.post(Api.NOTIFICATION + '/search', searchCriteria, (notifications: Notification[]) => {
      if (notifications) {
        for (let notification of notifications) {
          if (notification.provider) {
            notification.providerString = this.translate.instant('NOTIFICATION.' + notification.provider);
          }
          notification.typeString = this.translate.instant('NOTIFICATION.' + notification.type);
          notification.whenString = this.translate.instant('NOTIFICATION.' + notification.when);
          notification.recipientString = this.translate.instant('NOTIFICATION.' + notification.recipient);
          this.setDefaultValues(notification);
        }
        this.notifications = notifications;
      }
    });
  }


  public updateNotification(notification: Notification, callback: (data?: Notification) => void): void {

    if (!notification.id) {
      throw new Error('Notification doesnt have id, therefore can\'t be updated.');
    }
    this.setNotificationKeys(notification);
    this.http.put(Api.NOTIFICATION + '/' + notification.id,
      notification,
      () => {
        callback(notification);
      });
  }

  public createNotification(businessId: number,
                            notification: Notification,
                            callback: (data?: Notification) => void): void {
    this.setNotificationKeys(notification);
    this.http.post(Api.NOTIFICATION + '/' + businessId,
      notification,
      (createdNotification: Notification) => {
        this.setDefaultValues(createdNotification);
        callback(createdNotification);
      });
  }


  public setNotificationKeys(notification: Notification) {
    let lang: string = this.languageService.language;
    if (!lang) {
      lang = this.languageService.languageDefault;
    }
    let translate: object;

    switch (lang) {
      case 'cs':
        translate = cs;
        break;
      case 'en':
        translate = en;
        break;
      case 'pl':
        translate = pl;
        break;
      case 'sk':
        translate = sk;
        break;
      case 'es':
        translate = es;
        break;
      case 'de':
        translate = de;
        break;
    }

    if (notification.providerString) {
      notification.provider = notification.providerString.toUpperCase().replace(' ', '_') as IntegrationType;
    }
    translate = translate['NOTIFICATION'];
    // tslint:disable-next-line:forin
    for (const key in translate) {
      const translation = translate[key];
      if (translation === notification.recipientString) {
        notification.recipient = key as NotificationRecipientEnum;
      } else if (translation === notification.whenString) {
        notification.when = key as NotificationWhenEnum;
      } else if (translation === notification.typeString) {
        notification.type = key as NotificationTypeEnum;
      }
    }
  }

  private setDefaultValues(integrationData: Notification): void {
    switch (integrationData.type) {
      case NotificationTypeEnum.EMAIL:
        integrationData.name = 'gmail';
        integrationData.color = 'white';
        break;
      case NotificationTypeEnum.SLACK:
        integrationData.name = 'slack';
        integrationData.color = 'rgb(73, 23, 74)';
        break;
      case NotificationTypeEnum.SMS:
        switch (integrationData.provider) {
          case IntegrationType.TWILIO:
            integrationData.name = 'twilio';
            integrationData.color = 'rgb(240, 51, 75)';
            break;
          case IntegrationType.SMS_MANAGER:
            integrationData.name = 'sms_manager';
            integrationData.color = 'rgb(169, 27, 67)';
            break;
        }
        break;
    }
  }

}

