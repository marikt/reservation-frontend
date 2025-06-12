import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {ServiceMax} from '../../../../../../projects/notado-lib/src/lib/model/service-max';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {TypeaheadService} from '../../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {CropState, ResizeImageService} from '../../../../service/resize-image.service';
import {PexelImg} from '../../../../model/pexel-img';
import {PexelService} from '../../../../service/pexel.service';
import {Server} from '../../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ServiceType} from '../../../../../../projects/notado-lib/src/lib/enum/service-type';
import {Calendar} from '../../../../../../projects/notado-lib/src/lib/model/calendar';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {ServiceBadge, ServiceConfig} from '../../../../../../projects/notado-lib/src/lib/model/service-config';
import {GoogleTranslateService} from '../../../../service/google-translate.service';
import {DashboardServiceItemCommonComponent} from '../dashboard-service-item-common.component';
import {WorkerMax} from '../../../../../../projects/notado-lib/src/lib/model/worker-max';
import {Device} from '../../../../../../projects/notado-lib/src/lib/model/device';
import {WorkerInRelation} from '../../../../../../projects/notado-lib/src/lib/model/worker-in-relation';
import {DeviceInRelation} from '../../../../../../projects/notado-lib/src/lib/model/device-in-relation';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {FormsModule} from '@angular/forms';
import {VideoTutorialComponent} from '../../../video-tutorial/video-tutorial.component';
import {NgForOf, NgIf} from '@angular/common';
import {CalendarDropdownWithRefreshComponent} from '../../../util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ImageResizeComponent} from '../../../image-resize/image-resize.component';
import {FileUploadModule} from 'ng2-file-upload';
import {LineService} from '../../../../service/line.service';
import {ServiceService} from '../../../../service/service.service';

@Component({
  selector: 'app-dashboard-service-item-basic',
  templateUrl: './dashboard-service-item-basic.component.html',
  styleUrls: ['./dashboard-service-item-basic.component.scss'],
  imports: [
    TranslateModule,
    FormsModule,
    VideoTutorialComponent,
    NgIf,
    NgForOf,
    RouterLink,
    CalendarDropdownWithRefreshComponent,
    NgbTooltip,
    NgbDropdownToggle,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    ImageResizeComponent,
    FileUploadModule
  ],
  standalone: true
})
export class DashboardServiceItemBasicComponent extends DashboardServiceItemCommonComponent implements OnInit {

  public imgs: PexelImg[] = [];
  public searchKey: string;
  public courseNames: string[] = [];
  public workers: WorkerMax[];
  public devices: Device[];
  public serviceWorkers: WorkerInRelation[] = [];
  public serviceDevices: DeviceInRelation[] = [];

  @ViewChild('serviceImageUpload')
  public serviceImageUpload: any;
  public noCoursesFound: boolean = false;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public typeaheadService: TypeaheadService,
    public modalService: ModalService,
    public resizeImageService: ResizeImageService,
    private pexelService: PexelService,
    public server: Server,
    public translate: TranslateService,
    public languageService: LanguageService,
    public googleTranslateService: GoogleTranslateService,
    public preventDoubleClickService: PreventDoubleClickService,
    public lineService: LineService,
    public serviceService: ServiceService
  ) {
    super(
      dashboardService,
      alertService,
      broadcastService,
      http,
      router,
      modalService,
      translate,
      preventDoubleClickService,
      lineService,
      serviceService);
  }

  ngOnInit() {

    this.http.get(Api.RELATION + '/' + this.dashboardService.business.id + '/' + this.service.id + '/worker-relation-for-service',
      (workers: WorkerInRelation[]) => {
        this.serviceWorkers = workers;
        this.evaluateNoWorkerForService();
      });
    this.http.get(Api.RELATION + '/' + this.dashboardService.business.id + '/' + this.service.id + '/device-relation-for-service',
      (devices: DeviceInRelation[]) => {
        this.serviceDevices = devices;
        this.evaluateNoDeviceForService();
      });
    if (this.dashboardService.business.googleCalendarConnected) {
      this.loadCalendars();
    }

    if (!this.service.config) {
      this.service.config = new ServiceConfig();
      this.service.config.badge = new ServiceBadge();
    }


    if (!this.service.config.rating) {
      this.service.config.rating = 0;
    }

    this.initDataForCourse()
    this.resizeImageService.reset();
    this.resizeImageService.onCropCallback = (img) => {
      const url = Api.SERVICE + '/' + this.service.id + '/file';
      this.http.postFile(url, img, () => {
        this.modalService.close();
        this.resizeImageService.reset();
        if (this.service) {
          this.http.get(Api.SERVICE + '/' + this.service.id, (service: ServiceMax) => {
            this.service.img = service.img;
            this.service.fullPathImg = service.fullPathImg;
          });
        }
      });
    };
    this.initUploaderForCroper((imgUrl) => {
      this.resizeImageService.state = CropState.IMG_SELECTED;
      this.resizeImageService.setImgUrl(imgUrl);
    }, 400);
  }

  public saveService() {
    super.saveService();
    if (this.service.type === ServiceType.APPOINTMENT) {
      const workerIds: number[] = [];
      this.serviceWorkers.forEach(sw => {
        if (sw.active) {
          workerIds.push(sw.worker.id);
        }
      })
      this.http.put(Api.RELATION + '/' + this.service.id + '/worker-relation-for-service', workerIds);
    } else if (this.service.type === ServiceType.DEVICE) {
      const deviceIds: number[] = [];
      this.serviceDevices.forEach(sw => {
        if (sw.active) {
          deviceIds.push(sw.device.id);
        }
      })
      this.http.put(Api.RELATION + '/' + this.service.id + '/device-relation-for-service', deviceIds);
    }
  }


  public evaluateNoWorkerForService() {
    this.noWorkerForService = true;
    if (!this.serviceWorkers) {
      return;
    }
    for (const ds of this.serviceWorkers) {
      if (ds.active) {
        this.noWorkerForService = false;
      }
    }
  }

  public evaluateNoDeviceForService() {
    this.noDeviceForService = true;
    if (!this.serviceDevices) {
      return;
    }
    for (const ds of this.serviceDevices) {
      if (ds.active) {
        this.noDeviceForService = false;
      }
    }
  }

  public searchForPexelImg() {
    this.googleTranslateService.translate(this.searchKey, this.languageService.language, (translation) => {
      this.searchKey = translation;
      this.pexelService.getImages(translation, (imgs: PexelImg[]) => {
        this.imgs = imgs.filter(img => img.width > img.height);
      }, 50);
    });
  }

  public selectPexelImg(imgUrl: string): void {
    this.resizeImageService.state = CropState.IMG_SELECTED;
    this.resizeImageService.setImgUrl(imgUrl);
  }

  public openImageModal(): void {
    this.modalService.open(this.serviceImageUpload, {size: 'lg'});
    this.searchKey = this.service.name;
    this.searchForPexelImg();
  }

  public selectCalendar(calendar: Calendar): void {
    this.calendar = calendar;
    this.service.calendarId = calendar.id;
    this.service.eventName = null;
    this.initDataForCourse();
  }

  public initDataForCourse(callback ?: () => void) {
    this.noCoursesFound = false;
    if (this.service.type !== ServiceType.COURSE) {
      return;
    }
    if (!this.service.calendarId) {
      return;
    }
    this.http.post(Api.CACHE + '/clear-calendar/' + this.dashboardService.business.id,
      {id: this.service.calendarId}, () => {
        this.loadEventNames(callback);
      });
  }

  public readNewlyCreatedCoursesFromCalendar() {
    this.initDataForCourse(() => {
      this.noCoursesFound = !this.courseNames || this.courseNames.length === 0;
    });
  }

  public deleteImg(): void {
    this.http.delete(Api.SERVICE + '/' + this.service.id + '/img', () => {
    });
  };

  public loadEventNames(callback ?: () => void): void {
    this.http.get(Api.CALENDAR_EVENT + '/search-for-not-notado-event-names/' + this.dashboardService.business.id + '/' + this.service.calendarId,
      (courseNames: string[]) => {
        this.courseNames = courseNames;
        if (!this.service.eventName && this.courseNames && this.courseNames.length > 0) {
          this.service.eventName = this.courseNames[0];
        }
        callback();
      });
  }


  public setRating(value: number) {
    console.log('Rating changed:', value);
    this.service.config.rating = value;
  }
}
