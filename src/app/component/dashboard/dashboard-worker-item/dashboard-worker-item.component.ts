import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Uploader} from '../../../util/uploader';
import {WorkerMax} from '../../../../../projects/notado-lib/src/lib/model/worker-max';
import {OpeningDay} from '../../../../../projects/notado-lib/src/lib/model/opening-day';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {CropState, ResizeImageService} from '../../../service/resize-image.service';
import {ServiceMax} from '../../../../../projects/notado-lib/src/lib/model/service-max';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {ServiceInRelation} from '../../../../../projects/notado-lib/src/lib/model/service-in-relation';
import {ResponseType} from '../../../../../projects/notado-lib/src/lib/enum/response-type.enum';
import {Worker} from '../../../../../projects/notado-lib/src/lib/model/worker';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoadingProgressComponent} from '../loading-progress/loading-progress.component';
import {CalendarDropdownWithRefreshComponent} from '../../util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {OpeningItemComponent} from '../../util/opening-item/opening-item.component';
import {ImageResizeComponent} from '../../image-resize/image-resize.component';
import {FileUploadModule} from 'ng2-file-upload';
import {AddHolidayModalComponent} from '../module/add-holiday-modal/add-holiday-modal.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {DaysHoursMinutesPipe} from '../../../../../projects/notado-lib/src/lib/pipe/hours-minutes.pipe';
import {KeywordHighlighterComponent} from '../../util/keyword-highlighter/keyword-highlighter.component';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {LineService} from '../../../service/line.service';
import {WorkerService} from '../../../service/worker.service';
import {DashboardWorkerItemNotificationComponent} from './dashboard-worker-item-notification/dashboard-worker-item-notification.component';

@Component({
  selector: 'app-dashboard-worker-item',
  templateUrl: 'dashboard-worker-item.component.html',
  styleUrls: ['dashboard-worker-item.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule,
    NgIf,
    FormsModule,
    LoadingProgressComponent,
    CalendarDropdownWithRefreshComponent,
    RouterLink,
    VideoTutorialComponent,
    OpeningItemComponent,
    ImageResizeComponent,
    FileUploadModule,
    AddHolidayModalComponent,
    NgForOf,
    NgxFileDropModule,
    DaysHoursMinutesPipe,
    KeywordHighlighterComponent,
    NgbTooltip,
    DashboardWorkerItemNotificationComponent
  ],
  standalone: true
})
export class DashboardWorkerItemComponent extends Uploader implements OnInit {

  public showValidation: boolean;
  public showCalendar: boolean = false;
  public worker: Worker;
  public scheduleType: string;
  public services: ServiceMax[];
  public servicesInRelation: ServiceInRelation[] = [];
  public calendars: Calendar[] = [];
  public calendar: Calendar = new Calendar();
  public activeCard: string = 'BASIC';
  public noServiceForWorker: boolean = true;
  private tagsTemplate: string[] = [];
  public openingDays: OpeningDay[];

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
    public preventDoubleClickService: PreventDoubleClickService,
    private lineService: LineService,
    public workerService: WorkerService
  ) {
    super(alertService, broadcastService, http);
  }

  ngOnInit() {

    this.resizeImageService.reset();
    this.resizeImageService.onCropCallback = (img) => {
      const url = Api.WORKER + '/' + this.worker.id + '/file';
      this.http.postFile(url, img, () => {
        this.modalService.close();
        this.resizeImageService.reset();
        if (this.worker) {
          this.http.get(Api.WORKER + '/' + this.worker.id, (worker: Worker) => {
            this.worker.img = worker.img;
            this.worker.fullPathImg = worker.fullPathImg;
          });
        }
      });
    };

    this.http.get(Api.WORKER + '/' + this.route.snapshot.params.workerId,
      (worker: WorkerMax) => {
        this.worker = worker

        this.http.get(Api.OPENING_DAY + '/for-worker/' + this.worker.id,
          (openingDays: OpeningDay[]) => {
            this.openingDays = openingDays;
            this.scheduleType = (!this.openingDays || this.openingDays.length === 0) ? 'defaultSchedule' : 'customeSchedule';
          });

        if (this.dashboardService.business.googleCalendarConnected && !worker.calendarId) {
          this.spinnerService.startProgress();
          setTimeout(() => { // for case when worker were just created, try to load his calendar
              // load created calendar
              this.http.get(Api.WORKER + '/calendar/' + worker.id, (calendar: string) => {
                  this.worker.calendarId = calendar;
                  this.loadCalendars();
                  this.showCalendar = true;
                }, () => {
                },
                ResponseType.TEXT);
            },
            10_000);
        } else if (this.dashboardService.business.googleCalendarConnected && worker.calendarId) {
          this.loadCalendars();
          this.showCalendar = true;
        }
        this.http.get(Api.RELATION + '/' + this.dashboardService.business.id + '/' + this.worker.id + '/service-relation-for-worker',
          (servicesInRelation: ServiceInRelation[]) => {
            this.servicesInRelation = servicesInRelation;
            this.evaluateNoServiceForWorker();
          });
      }
    );

    this.initUploaderForCroper((imgUrl => {
      this.resizeImageService.state = CropState.IMG_SELECTED;
      this.resizeImageService.setImgUrl(imgUrl);
    }), 350);

    this.cdRef.detectChanges();
  }

  public saveWorker() {
    this.preventDoubleClickService.preventFor();
    this.lineService.clean();
    const serviceIds: number[] = [];
    this.servicesInRelation.forEach(s => {
      if (s.active) {
        serviceIds.push(s.service.id);
      }
    })
    this.http.put(Api.RELATION + '/' + this.worker.id + '/service-relations-for-worker', serviceIds);

    this.http.put(Api.OPENING_DAY + '/for-worker/' + this.worker.id, this.openingDays);

    this.http.put(Api.WORKER + '/' + this.worker.id, this.worker,
      () => {
        this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
      }, (error) => {
        console.log(error);
      }
    );

    if (this.dashboardService.business.googleCalendarConnected &&
      this.calendar.id !== this.worker.calendarId) {
      this.worker.calendarId = this.calendar.id;
      this.changeCalendar();
    }

    this.tagsTemplate.push('#služba');
    this.tagsTemplate.push('#zaměstnanec');
    this.tagsTemplate.push('#email-zaměstnance');
    this.tagsTemplate.push('#telefon-zaměstnance');
    this.tagsTemplate.push('#datum-rezervace');
    this.tagsTemplate.push('#čas-rezervace');
    this.tagsTemplate.push('#cena');
    this.tagsTemplate.push('#link-zrušení-rezervace');

    this.tagsTemplate.push('#service');
    this.tagsTemplate.push('#employee');
    this.tagsTemplate.push('#employee-email');
    this.tagsTemplate.push('#employee-phone');
    this.tagsTemplate.push('#date');
    this.tagsTemplate.push('#time');
    this.tagsTemplate.push('#price');
    this.tagsTemplate.push('#business');
    this.tagsTemplate.push('#reservation-cancel');
    this.tagsTemplate.push('#zoom');
    if (!this.worker.notificationMsg) {
      this.worker.notificationMsg = '';
    }
  }

  public addOpeningDays(): void {
    this.openingDays = OpeningDay.getDefaultValue();
    this.http.put(Api.OPENING_DAY + '/for-worker/' + this.worker.id, this.openingDays);
  }

  public removeOpeningDays(): void {
    this.openingDays = [];
    this.http.put(Api.OPENING_DAY + '/for-worker/' + this.worker.id, this.openingDays);
  }

  public evaluateNoServiceForWorker() {
    this.noServiceForWorker = true;
    if (!this.servicesInRelation) {
      return;
    }
    for (const s of this.servicesInRelation) {
      if (s.active) {
        this.noServiceForWorker = false;
      }
    }
  }

  public workerHasGmail(): boolean {
    if (!this.worker.email) {
      return;
    }
    return this.worker.email.endsWith('@gmail.com');
  }

  public changeCalendar(): void {
    if (this.worker.calendarId) {
      this.http.put(Api.WORKER + '/' + this.worker.id + '/update-calendar-id', this.worker.calendarId,
        () => {
          this.alertService.addInfo(this.translate.instant('ALERT.WORKER_UPDATED'));
        },
        () => {
        });
    }
  }

  public loadCalendars(): void {
    this.http.get(Api.CALENDAR + '/all/' + this.dashboardService.business.id,
      (calendars: Calendar[]) => {
        this.calendars = calendars;
        if (!this.calendars) {
          this.calendars = [];
        }
        for (const calendar of this.calendars) {
          if (calendar && calendar.id === this.worker.calendarId) {
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
    this.http.delete(Api.WORKER + '/' + this.worker.id + '/img', () => {
    });
  };

}
