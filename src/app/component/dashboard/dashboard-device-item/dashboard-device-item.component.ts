import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Uploader} from '../../../util/uploader';
import {Device} from '../../../../../projects/notado-lib/src/lib/model/device';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {CropState, ResizeImageService} from '../../../service/resize-image.service';
import {ServiceInRelation} from '../../../../../projects/notado-lib/src/lib/model/service-in-relation';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {ResponseType} from '../../../../../projects/notado-lib/src/lib/enum/response-type.enum';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {FormsModule} from '@angular/forms';
import {LoadingProgressComponent} from '../loading-progress/loading-progress.component';
import {CalendarDropdownWithRefreshComponent} from '../../util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {ImageResizeComponent} from '../../image-resize/image-resize.component';
import {FileUploadModule} from 'ng2-file-upload';
import {NgxFileDropModule} from 'ngx-file-drop';

@Component({
  selector: 'app-dashboard-device-item',
  templateUrl: './dashboard-device-item.component.html',
  styleUrls: ['./dashboard-device-item.component.scss'],
  imports: [
    DashboardCardComponent,
    NgIf,
    DashboardCardLabelComponent,
    TranslateModule,
    FormsModule,
    LoadingProgressComponent,
    CalendarDropdownWithRefreshComponent,
    RouterLink,
    NgForOf,
    ImageResizeComponent,
    FileUploadModule,
    NgxFileDropModule
  ],
  standalone: true
})
export class DashboardDeviceItemComponent extends Uploader implements OnInit {

  public showValidation: boolean;
  public showCalendar: boolean = false;
  public device: Device;
  private idx: number;
  public scheduleType: string;
  public servicesInRelation: ServiceInRelation[] = [];
  public calendars: Calendar[] = [];
  public calendar: Calendar = new Calendar();
  public noServiceForDevice: boolean = true;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    private route: ActivatedRoute,
    public router: Router,
    public modalService: ModalService,
    public resizeImageService: ResizeImageService,
    private cdRef: ChangeDetectorRef,
    public server: Server,
    public translate: TranslateService,
    public spinnerService: SpinnerService,
    public preventDoubleClickService: PreventDoubleClickService
  ) {
    super(alertService, broadcastService, http);
  }

  ngOnInit() {
    this.resizeImageService.reset();
    this.resizeImageService.onCropCallback = (img) => {
      const url = Api.DEVICE + '/' + this.device.id + '/file';
      this.http.postFile(url, img, () => {
        this.modalService.close();
        this.resizeImageService.reset();
        if (this.device) {
          this.http.get(Api.DEVICE + '/' + this.device.id, (device: Device) => {
            this.device.img = device.img;
            this.device.fullPathImg = device.fullPathImg;
          });
        }
      });
    };
    this.http.get(Api.DEVICE + '/' + this.route.snapshot.params.deviceId,
      (device: Device) => {
        this.device = device;

        if (this.dashboardService.business.googleCalendarConnected && !device.calendarId) {
          this.spinnerService.startProgress();

          setTimeout(() => { // for case when worker were just created, try to load his calendar
              // load created calendar
              this.http.get(Api.DEVICE + '/calendar/' + device.id, (calendar: string) => {
                  this.device.calendarId = calendar;
                  this.loadCalendars();
                  this.showCalendar = true;
                }, () => {
                },
                ResponseType.TEXT);
            },
              10_000);
        } else if (this.dashboardService.business.googleCalendarConnected && device.calendarId) {
          this.loadCalendars();
          this.showCalendar = true;
        }
        this.http.get(Api.RELATION + '/' + this.dashboardService.business.id + '/' + this.device.id + '/service-relation-for-device',
          (servicesInRelation: ServiceInRelation[]) => {
            this.servicesInRelation = servicesInRelation;
            this.evaluateNoServiceForDevice();
          });
      });

    this.initUploaderForCroper((imgUrl => {
      this.resizeImageService.state = CropState.IMG_SELECTED;
      this.resizeImageService.setImgUrl(imgUrl);
    }), 350);
    this.cdRef.detectChanges();
  }

  public deleteDevice(): void {
    if (this.idx < 0) {
      return;
    }
    this.http.delete(Api.DEVICE + '/' + this.dashboardService.business.id + '/' + this.device.id, () => {
      this.modalService.close();
      this.alertService.addInfo(this.translate.instant('ALERT.DEVICE_DELETED'));
      this.router.navigate(['/dashboard/dashboard-device']);
    });
  }

  public saveDevice() {
    this.preventDoubleClickService.preventFor();
    const serviceIds: number[] = [];
    this.servicesInRelation.forEach(s => {
      if (s.active) {
        serviceIds.push(s.service.id);
      }
    })
    this.http.put(Api.RELATION + '/' + this.device.id + '/service-relations-for-device', serviceIds, (updatedService) => {
    });
    this.http.put(Api.DEVICE + '/' + this.device.id, this.device, (updatedDevice: Device) => {
      this.device = updatedDevice;
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });
    if (this.dashboardService.business.googleCalendarConnected &&
      this.calendar.id !== this.device.calendarId) {
      this.device.calendarId = this.calendar.id;
      this.changeCalendar();
    }
  }

  public evaluateNoServiceForDevice() {
    this.noServiceForDevice = true;
    if (!this.servicesInRelation) {
      return;
    }
    for (const s of this.servicesInRelation) {
      if (s.active) {
        this.noServiceForDevice = false;
      }
    }
  }

  public changeCalendar(): void {
    if (this.device.calendarId) {
      this.http.put(Api.DEVICE + '/' + this.device.id + '/update-calendar-id', this.device.calendarId, () => {
        this.alertService.addInfo(this.translate.instant('ALERT.DEVICE_UPDATED'));
      });
    }
  }

  public loadCalendars(): void {
    const businessId = this.dashboardService.business.id;
    this.http.get(Api.CALENDAR + '/all/' + businessId, (calendars: Calendar[]) => {
      this.calendars = calendars;
      if (!this.calendars) {
        this.calendars = [];
      }
      for (const calendar of this.calendars) {
        if (calendar && calendar.id === this.device.calendarId) {
          this.calendar = calendar;
          return;
        }
      }
    });
  }

  public selectCalendar(calendar: Calendar): void {
    this.calendar = calendar;
  }

  public deleteImg(): void {
    this.http.delete(Api.DEVICE + '/' + this.device.id + '/img', () => {
    });
  };
}
