import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../service/dashboard.service';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../../../projects/notado-lib/src/lib/util/event.enum';
import {Alert} from '../../../../../projects/notado-lib/src/lib/enum/alert';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {MetaService} from '../../../service/meta.service';
import {TodoItemService} from '../../../service/todo-item.service';
import {Router, RouterLink} from '@angular/router';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {CONST} from '../../../../../projects/notado-lib/src/lib/util/const';
import {PaymentPlan} from '../../../util/payment-plan';
import {Business} from '../../../../../projects/notado-lib/src/lib/model/business';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {LocalStorageService} from '../../../../../projects/notado-lib/src/lib/service/local-storage.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardPathComponent} from '../dashboard-path/dashboard-path.component';
import {TodolistItemComponent} from '../todolist/todolist-item/todolist-item.component';
import {NgbAlert, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {VideoGuideComponent} from '../../video-guide/video-guide.component';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {DaysHoursMinutesPipe} from '../../../../../projects/notado-lib/src/lib/pipe/hours-minutes.pipe';
import {Service} from '../../../../../projects/notado-lib/src/lib/model/service';
import {Worker} from '../../../../../projects/notado-lib/src/lib/model/worker';
import 'leader-line';
import {TextShortPipe} from '../../../../../projects/notado-lib/src/lib/pipe/text-short.pipe';
import {LineService} from '../../../service/line.service';
import {WorkerService} from '../../../service/worker.service';
import {ServiceService} from '../../../service/service.service';
import {FormServiceComponent} from '../../../../../projects/notado-lib/src/lib/component/form/form-service/form-service.component';
import {CreatedReservationsInLastXDays} from './graph/created-reservations-in-last-x-days/created-reservations-in-last-x-days.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingCardComponent} from './landing-card/landing-card.component';
import {
  GoToGoogleCalendarSettingPopupComponent
} from '../../util/go-to-google-calendar-setting-popup/go-to-google-calendar-setting-popup.component';
import {FormUrlPipe} from '../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

@Component({
  selector: 'app-dashboard-landing',
  templateUrl: './dashboard-landing.component.html',
  styleUrls: ['./dashboard-landing.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    RouterLink,
    DashboardCardComponent,
    DashboardCardLabelComponent,
    DashboardPathComponent,
    TodolistItemComponent,
    NgForOf,
    NgbAlert,
    VideoGuideComponent,
    VideoTutorialComponent,
    DaysHoursMinutesPipe,
    NgbTooltip,
    JsonPipe,
    TextShortPipe,
    FormServiceComponent,
    CreatedReservationsInLastXDays,
    FormUrlPipe,
    ReactiveFormsModule,
    FormsModule,
    LandingCardComponent,
    GoToGoogleCalendarSettingPopupComponent
  ],
  standalone: true
})
export class DashboardLandingComponent extends MySubscribable implements OnInit, OnDestroy {

  @ViewChild('subscribeModal')
  public subscribeModal: any;

  public userAccountAlert: Alert;
  public showValidation: boolean = false;
  public voucher: string;

  public dashboardItems: DashboardItem[] = [];
  public selectedService: Service;
  public selectedWorker: Worker;
  public allReservationCount: number;

  constructor(
    public userService: UserService,
    public http: HttpService,
    public lineService: LineService,
    public dashboardService: DashboardService,
    public broadcastService: BroadcastService,
    public modalService: ModalService,
    public alertService: AlertService,
    public metaService: MetaService,
    public todoItemService: TodoItemService,
    public router: Router,
    public languageService: LanguageService,
    private localStorage: LocalStorageService,
    public server: Server,
    public workerService: WorkerService,
    public serviceService: ServiceService,
    public formUrlPipe: FormUrlPipe,
    public translate: TranslateService
  ) {
    super(broadcastService);

    this.subscribe(Event.PAYMENT_FOR_SUBSCRIPTION_SUCCESS, () => {
      setTimeout(
        () => {
          this.modalService.open(this.subscribeModal, {size: 'lg'});
          setTimeout(() => {
            this.modalService.close();
          }, 3500);
        }, 2000
      );
    });
    this.subscribe(Event.BUSINESSES_LOADED, (business: Business) => {
        todoItemService.loadTodos(business);
        this.localStorage.set(CONST.BUSINESS_URL, business.url);
        this.localStorage.set(CONST.BUSINESS_ID, business.id);

        if (!business.language) {
          business.language = this.languageService.language;
          if (this.dashboardService.business) {
            this.dashboardService.business.language = this.languageService.language;
          }
          this.http.put(Api.BUSINESS + '/' + business.id, business);
        }
        this.loadReservationCount();
        this.lineService.loadedWorkerAndServicesAndCreateLines();
      }
    );

    this.subscribe(Event.GOOGLE_CALENDAR_SUCCESSFULLY_CONNECTED, () => {
        todoItemService.loadTodos(this.dashboardService.business);
      }
    );
  }

  private loadReservationCount() {
    this.http.get(Api.STATISTIC + '/all-reservation-count/' + this.dashboardService.business.id, (allReservationCount: number) => {
      this.allReservationCount = allReservationCount;
    });
  }

  ngOnInit() {
    this.todoItemService.loadTodos(this.dashboardService.business);
    this.dashboardItems.push(new DashboardItem('fas fa-store-alt', 'DASHBOARD.MENU.BUSINESS', 'dashboard-business', null, false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-users', 'DASHBOARD.MENU.WORKER', 'dashboard-worker', null, false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-cut', 'DASHBOARD.MENU.SERVICE', 'dashboard-service', null, false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-gift', 'DASHBOARD.MENU.COUPON', 'dashboard-coupon', null, false, true));
    this.dashboardItems.push(new DashboardItem('fas fa-laptop-code', 'DASHBOARD.MENU.ADD_FORM', 'dashboard-button-platform', 'd-md-block d-none', false, false));
    this.dashboardItems.push(new DashboardItem('far fa-window-restore', 'DASHBOARD.MENU.RESERVATION_FORM', 'dashboard-reservation-form', 'd-md-block d-none', false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-hot-tub', 'DASHBOARD.MENU.DEVICE', 'dashboard-device', null, false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-wrench', 'DASHBOARD.MENU.RESERVATION_CONFIG', 'dashboard-reservation-config', null, false, false));
    this.dashboardItems.push(new DashboardItem('far fa-comment-dots', 'DASHBOARD.MENU.NOTIFICATION', 'dashboard-notification', null, false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-calendar-alt', 'DASHBOARD.MENU.CALENDAR_AVAILABILITY', 'dashboard-button-custom-web', null, false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-user-check', 'DASHBOARD.MENU.CUSTOMER', 'dashboard-customer', null, false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-envelope-open-text', 'DASHBOARD.MENU.EMAIL', 'dashboard-message', null, false, false));
    this.dashboardItems.push(new DashboardItem('far fa-object-group', 'DASHBOARD.MENU.SERVICE_GROUP', 'dashboard-service-group', null, false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-city', 'DASHBOARD.MENU.BUSINESS_BRANCH', 'dashboard-business-branch', null, false, false));
    this.dashboardItems.push(new DashboardItem('far fa-credit-card', 'DASHBOARD.MENU.FORM_PAYMENT', 'dashboard-reservation-form-payment', 'd-md-block d-none', false, false));
    this.dashboardItems.push(new DashboardItem('fas fa-user-cog', 'DASHBOARD.PROFILE.TITLE', 'dashboard-profile', null, false, false));

    if (this.dashboardService.business) {
      this.lineService.loadedWorkerAndServicesAndCreateLines();
      this.loadReservationCount();

    }

    // // for dev purpose when working on some page
    // setTimeout(() => {
    //     this.router.navigate(['dashboard/dashboard-reservation-form']);
    //   },
    //   800);
  }

  public ngOnDestroy() {
    this.lineService.destroyLines();
  }

  public closeUserAccountAlert() {
    this.userAccountAlert = null;
  }

  public copyButtonLink(): void {
    navigator.clipboard.writeText(this.formUrlPipe.transform(this.dashboardService.business.url)).then().catch(e => console.log(e));
    this.alertService.addInfo(this.translate.instant('ALERT.URL_COPY'));
  }

  public isDiscountApplicable() {
    if (this.todoItemService.todoItemWarnOrErrorNames.length > 0 ||
      this.dashboardService.payment.plan !== PaymentPlan.TRIAL) {
      return false;
    }
    const validity: Date = new Date(this.dashboardService.payment.validity);
    const today: Date = new Date();
    const seventyDaysLater: Date = new Date(today.setDate(today.getDate() + 75));
    return validity > seventyDaysLater;
  }

  public handleImageNotLoadedForWorker(worker: Worker) {
    console.error('handleImageNotLoaded()');
    worker.fullPathImg = null;
  }

  public handleImageNotLoadedForService(service: Service) {
    console.error('handleImageNotLoaded()');
    service.fullPathImg = null;
  }

}

export class DashboardItem {
  public icon: string;
  public label: string;
  public link: string;
  public clazz: string;
  public newBadge: boolean;
  public labRelease: boolean;

  public constructor(icon: string, label: string, link: string, clazz: string, newBadge: boolean, labRelease: boolean) {
    this.icon = icon;
    this.label = label;
    this.link = link;
    this.newBadge = newBadge;
    this.labRelease = labRelease;
    if (clazz) {
      this.clazz = clazz;
    } else {
      this.clazz = '';
    }
  }
}
