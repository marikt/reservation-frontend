import {ServiceCapacityType} from '../util/service-capacity-type';
import {ServiceType} from '../enum/service-type';
import {ServiceConfig} from './service-config';
import {Duration} from './duration';
import {StripeCouponConfig} from './stripe-coupon-config';

export class Service {

  public id: number;
  public name: string;
  public techName: string;
  public description: string;
  public notificationMsg: string;
  public businessId: number;
  public duration: Duration;
  public durationMin: Duration;
  public durationMax: Duration;
  public pause: Duration;
  public rating: number;
  public img: string;
  public imgTmp: string;
  public fullPathImg: string;
  public active: boolean;

  /**
   * if true duration will be specified during booking,
   * !make sure service COURSE has always set it FALSE
   */
  public durationNotSpecified: boolean;
  public capacityType: ServiceCapacityType;
  public capacity: number;
  public price: number;
  public location: string;
  public allowMultipleBooking: boolean;

  /**
   * Name which will be used to seach for courses
   */
  public eventName: string;
  public type: ServiceType;
  public calendarId: string;

  /**
   * On courser full capacity switch event to this calendar
   */
  public calendarToSwitchId: string;

  /**
   * On courser full capacity switch name event to this
   * eg: YOGA -> YOGA [FULL]
   */
  public nameToSwitch: string;

  /**
   * On courser full capacity switch color
   */
  public colorToSwitch: string;

  public sequence: number;
  public color: string;
  public config: ServiceConfig;

  public stripeCouponId: string;
  public stripeCouponConfig: StripeCouponConfig;
  public elementRef: any;

  constructor() {
    this.capacityType = ServiceCapacityType.ONE_TO_ONE;
    this.type = ServiceType.APPOINTMENT;
  }

}

