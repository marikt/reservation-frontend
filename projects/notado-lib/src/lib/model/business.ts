import {BusinessType} from '../util/business-type';
import {BusinessState} from '../util/business-state';


export class Business {

  public id: number;
  public url: string;
  public email: string;
  public active: boolean;
  public name: string;
  public img: string;
  public description: string;
  public language: string;
  public currency: string;
  public type: BusinessType;
  public state: BusinessState;
  public templateId: number;
  public calendarId: string;
  public publicHolidayCalendarId: string;

  public userId: number;

  public googleCalendarConnected: boolean;
  public googleContactConnected: boolean;

  public contactLabel;
  public contactLabelId;
  public blacklistLabelId;
  public blacklistLabel;
  public whitelistLabelId;
  public whitelistLabel;

  public location: string;

  constructor() {

  }
}
