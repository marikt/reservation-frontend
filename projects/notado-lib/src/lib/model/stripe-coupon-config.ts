import {MyDate} from './date';

export enum CouponValidityType {
  NO_LIMIT = 'NO_LIMIT',
  TILL_X_MONTHS_FROM_PURCHASE = 'TILL_X_MONTHS_FROM_PURCHASE',
  TILL_DATE = 'TILL_DATE'
}

export class StripeCouponConfig {
  public userSpecific: boolean;
  public noOfUsage: number;
  public validTill: MyDate;
  public validityType: CouponValidityType;
}
