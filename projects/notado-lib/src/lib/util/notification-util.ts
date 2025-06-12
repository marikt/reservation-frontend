import {NotificationTypeEnum} from './notification-type-enum';
import {NotificationRecipientEnum} from './notification-recipient-enum';
import {NotificationWhenEnum} from './notification-when-enum';

export class NotificationUtil {

  public static typeToString(type: NotificationTypeEnum): string {
    switch (type) {
      case NotificationTypeEnum.SMS:
        return 'sms';
      case NotificationTypeEnum.EMAIL:
        return 'email';
      default:
        return '';
    }
  }

  public static stringToType(typeString: string): NotificationTypeEnum {
    switch (typeString) {
      case 'sms':
        return NotificationTypeEnum.SMS;
      case 'email':
        return NotificationTypeEnum.EMAIL;
      default:
        return null;
    }
  }

  public static recipientToString(recipient: NotificationRecipientEnum): string {
    switch (recipient) {
      // case NotificationRecipientEnum.ME:
      //   return 'mi';
      case NotificationRecipientEnum.CUSTOMER:
        return 'zákazníkovi';
      case NotificationRecipientEnum.EMPLOYEE:
        return 'mému zaměstnanci';
      default:
        return '';

    }
  }

  public static stringToRecipient(recipientString: string): NotificationRecipientEnum {
    switch (recipientString) {
      // case 'mi':
      //   return NotificationRecipientEnum.ME;
      case 'zákazníkovi':
        return NotificationRecipientEnum.CUSTOMER;
      case 'mému zaměstnanci':
        return NotificationRecipientEnum.EMPLOYEE;
      default:
        return null;
    }
  }

  public static whenToString(when: NotificationWhenEnum): string {
    switch (when) {
      case NotificationWhenEnum.ON_RESERVATION_CREATE:
        return 'při vytvoření rezervace';
      case NotificationWhenEnum.FIVE_HOURS_BEFORE:
        return 'hodinu před rezervací';
      case NotificationWhenEnum.ONE_DAY_BEFORE:
        return 'den před rezervací';
      case NotificationWhenEnum.ONE_DAY_AFTER:
        return 'den po rezervaci';
      case NotificationWhenEnum.TWO_DAYS_BEFORE:
        return 'dva dny před rezervací';
      default:
        return '';

    }
  }

  public static stringToWhen(whenString: string): NotificationWhenEnum {
    switch (whenString) {
      case 'při vytvoření rezervace':
        return NotificationWhenEnum.ON_RESERVATION_CREATE;
      case 'hodinu před rezervací':
        return NotificationWhenEnum.FIVE_HOURS_BEFORE;
      case 'den před rezervací':
        return NotificationWhenEnum.ONE_DAY_BEFORE;
      case 'den po rezervaci':
        return NotificationWhenEnum.ONE_DAY_AFTER;
      case 'dva dny před rezervací':
        return NotificationWhenEnum.TWO_DAYS_BEFORE;
      default:
        return null;

    }
  }

  // public static providerToString(provider: IntegrationType): string {
  //   switch (provider) {
  //     case NotificationWhenEnum.ON_RESERVATION_CREATE:
  //       return 'při vytvoření rezervace';
  //     case NotificationWhenEnum.FIVE_HOURS_BEFORE:
  //       return 'hodinu před rezervací';
  //     case NotificationWhenEnum.ONE_DAY_BEFORE:
  //       return 'den před rezervací';
  //     default:
  //       return '';
  // }

}
