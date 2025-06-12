import {NotificationTypeEnum} from '../../../projects/notado-lib/src/lib/util/notification-type-enum';
import {NotificationRecipientEnum} from '../../../projects/notado-lib/src/lib/util/notification-recipient-enum';
import {NotificationWhenEnum} from '../../../projects/notado-lib/src/lib/util/notification-when-enum';

export class NotificationMsg {

  public type: NotificationTypeEnum;
  public recipient: NotificationRecipientEnum;
  public when: NotificationWhenEnum;
  public msg: string;

  constructor() {

  }

}
