import {Input, OnInit, Directive} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Uploader} from '../../../util/uploader';
import {Router} from '@angular/router';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {ServiceType} from '../../../../../projects/notado-lib/src/lib/enum/service-type';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {ServiceCapacityType} from '../../../../../projects/notado-lib/src/lib/util/service-capacity-type';
import {Service} from '../../../../../projects/notado-lib/src/lib/model/service';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {LineService} from '../../../service/line.service';
import {ServiceService} from '../../../service/service.service';
import {ServiceMax} from '../../../../../projects/notado-lib/src/lib/model/service-max';

@Directive()
export class DashboardServiceItemCommonComponent extends Uploader implements OnInit {

  public showValidation: boolean;

  // tslint:disable-next-line:no-input-rename
  @Input('service')
  public service: ServiceMax;

  public calendars: Calendar[] = [];
  public calendar: Calendar = new Calendar();

  public noDeviceForService: boolean = true;
  public noWorkerForService: boolean = true;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public modalService: ModalService,
    public translate: TranslateService,
    public preventDoubleClickService: PreventDoubleClickService,
    public lineService: LineService,
    public serviceService: ServiceService
  ) {
    super(alertService, broadcastService, http);
  }

  ngOnInit() {
  }

  public saveService() {
    this.preventDoubleClickService.preventFor();
    this.lineService.clean();
    if (this.service.capacityType === ServiceCapacityType.ONE_TO_ONE) {
      this.service.capacity = 1;
    }
    this.http.put(Api.SERVICE + '/' + this.service.id, this.service, () => {
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });
  }

  public deleteService(service: Service): void {
    this.serviceService.deleteService(service);
  }

  public get serviceType(): typeof ServiceType {
    return ServiceType;
  }

  public loadCalendars(callback?: (data: any) => void): void {
    const businessId = this.dashboardService.business.id;
    if (!this.dashboardService.business.googleCalendarConnected) {
      return;
    }
    this.http.get(Api.CALENDAR + '/all/' + businessId, (calendars: Calendar[]) => {
      this.calendars = calendars;
      if (callback) {
        callback(calendars);
      }
      if (!this.calendars) {
        this.calendars = [];
      }
      for (const calendar of this.calendars) {
        if (calendar && calendar.id === this.service.calendarId) {
          this.calendar = calendar;
        }
      }
    });
  }

}
