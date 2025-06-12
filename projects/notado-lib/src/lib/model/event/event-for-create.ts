import {ServiceMax} from '../service-max';
import {WorkerMax} from '../worker-max';
import {ServiceGroupMax} from '../service-group-max';
import {CustomField} from '../reservation-form/custom-field';
import {Device} from '../device';
import {BusinessBranchMax} from '../business-branch-max';
import {ServiceType} from '../../enum/service-type';
import {MyDate} from '../date';
import {Time} from '../time';
import {EventDateAndTimeAndId} from './event-date-and-time-and-id';
import {Duration} from '../duration';

export class EventForCreate {

  public id: string;
  public calendarId: string;
  public title: string;
  public businessId: number;
  public type: ServiceType;
  public dateAndTimeAndIds: EventDateAndTimeAndId[];
  public name: string;
  public email: string;
  public phone: string;
  public service: ServiceMax;
  public serviceGroup: ServiceGroupMax;
  public businessBranch: BusinessBranchMax;
  public worker: WorkerMax;
  public device: Device;
  public voucher: string;
  public note: string;
  public language: string;
  public customFields: CustomField[] = [];
  public keyguruReservationId: string;
  /**
   * Set by person making reservation - eg: making reservation on pain-ball for 5 people
   */
  public requestedAttendeesNo: number = 1;

  /**
   * taken form service.duration of if service.durationNotSpecified then from how its set during booking
   */
  public duration: Duration;

  /**
   * This is set when client select course from calendar avail
   */
  public remainingCapacity: number = -1;

  public startDate: MyDate;
  public startTime: Time;
  public timeMinutes: number;

  constructor() {
  }

    public toJSON(): any {
        return {
          'id': this.id,
          'name': this.name,
          'email': this.email,
          'phone': this.phone,
          'language': this.language,
          'businessId': this.businessId,
          'serviceId': this.service ? this.service.id : null,
          'serviceName': this.service ? this.service.name : null,
          'workerId': this.worker ? this.worker.id : null,
          'workerName': this.worker ? this.worker.name : null,
          'deviceId': this.device ? this.device.id : null,
          'deviceName': this.device ? this.device.name : null,
          'businessBranchName': this.businessBranch ? this.businessBranch.name : null,
          'businessBranchId': this.businessBranch ? this.businessBranch.id : null,
          'voucher': this.voucher,
          'customFields': this.customFields,
          'dateAndTimeAndIds': this.dateAndTimeAndIds,
          'duration': this.service ? this.service.duration : null,
          'note': this.note,
          'startDate': this.startDate,
          'startTime': this.startTime,
          'timeMinutes': this.timeMinutes,
          'requestedAttendeesNo': this.requestedAttendeesNo
        };
    }
}
