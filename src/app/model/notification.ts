import {NotificationTypeEnum} from '../../../projects/notado-lib/src/lib/util/notification-type-enum';
import {NotificationRecipientEnum} from '../../../projects/notado-lib/src/lib/util/notification-recipient-enum';
import {NotificationWhenEnum} from '../../../projects/notado-lib/src/lib/util/notification-when-enum';
import {IntegrationType} from '../../../projects/notado-lib/src/lib/util/integration-type';
import {NotificationStatus} from '../../../projects/notado-lib/src/lib/util/notification-status';

export class Notification {

  public id: number;
  public type: NotificationTypeEnum;
  public recipient: NotificationRecipientEnum;
  public when: NotificationWhenEnum;
  public provider: IntegrationType;
  public typeString: string = '';
  public providerString: string = '';
  public recipientString: string = '';
  public whenString: string = '';
  public active: boolean;
  public status: NotificationStatus;
  public color: string;
  public name: string;

  constructor() {

  }

}
