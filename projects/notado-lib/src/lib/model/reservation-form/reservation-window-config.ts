import {CustomField} from './custom-field';
import {CustomFieldForService} from './custom-field-for-service';

export class ReservationWindowConfig {
  public phone: boolean = false;
  public hidePrice: boolean = false;
  public licenceAgreement: boolean = false;
  public licenceAgreementConf: CustomField;
  public hideDuration: boolean = false;
  public paymentButtonLabel: string;
  // @depricated - use customFieldsForService instead
  public customFields: CustomField[] = [];
  public customFieldsForServices: CustomFieldForService[] = [];
  public alertItems: AlertItem[] = [];
  public redirectOnReservationFin: string;
}


export class AlertItem {
  public type: string;
  public label: string;
  public msg: string;
}
