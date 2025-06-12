import {Injectable} from '@angular/core';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {ReservationTemplate} from '../../../projects/notado-lib/src/lib/model/reservation-form/reservation-template';
import {FormWindowName} from '../../../projects/notado-lib/src/lib/util/form-window-name';
import {ReservationWindow} from '../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {UserService} from '../../../projects/notado-lib/src/lib/security/service/user.service';
import {CONST} from '../../../projects/notado-lib/src/lib/util/const';
import {Router} from '@angular/router';
import {Payment} from '../model/payment';
import {ModalService} from '../../../projects/notado-lib/src/lib/service/modal.service';
import {TemplateUtil} from '../../../projects/notado-lib/src/lib/util/template-util';
import {ReservationWindowConfig} from '../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window-config';
import {Business} from '../../../projects/notado-lib/src/lib/model/business';
import {PreventDoubleClickService} from '../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {LanguageService} from '../../../projects/notado-lib/src/lib/service/language.service';
import {LocalStorageService} from '../../../projects/notado-lib/src/lib/service/local-storage.service';
import {StringUtil} from '../../../projects/notado-lib/src/lib/util/string-util';

/**
 * Service holds data:
 *
 * business
 * template
 *
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService extends MySubscribable {

  public business: Business;
  public businesses: Business[] = [];
  public template: ReservationTemplate;
  public payment: Payment;
  public processingPayment: boolean = false;

  constructor(
    public broadcastService: BroadcastService,
    public http: HttpService,
    public userService: UserService,
    private localStorage: LocalStorageService,
    public router: Router,
    private modalService: ModalService,
    private preventDoubleClickService: PreventDoubleClickService,
    private languageService: LanguageService,
  ) {
    super(broadcastService);

    this.subscribe(Event.USER_LOADED, () => {
      const businessId = this.localStorage.get(CONST.WIZARD_BUSINESS_ID);
      this.localStorage.remove(CONST.WIZARD_BUSINESS_ID);

      if (businessId) {
        this.http.get(Api.BUSINESS + '/' + businessId, (business: Business) => {
          // assignee created business to user
          business.userId = this.userService.user.id;
          this.http.put(Api.BUSINESS + '/' + business.id, business, () => {
            this.loadBusiness();
          });
        });
      } else {
        this.loadBusiness();
      }
      this.loadPayment();
    });
  }

  public loadBusiness() {
    this.preventDoubleClickService.preventFor(5);
    // does user already has a business?
    this.http.get(Api.BUSINESS + '/by-user/' + this.userService.user.id, (businesses: Business[]) => {
      if (businesses && businesses.length > 0) {
        this.processAfterBusinessLoaded(businesses);
      } else {
        this.http.post(Api.BUSINESS + '/default-for-user/' + this.userService.user.id + '/' + this.languageService.language, {}, (business2: Business) => {
            this.businesses = [];
            this.businesses[0] = business2;
            this.processAfterBusinessLoaded(this.businesses);
          }
        );
      }
    });
  }

  private processAfterBusinessLoaded(businesses: Business[]) {
    this.businesses = businesses;
    this.business = this.businesses[0];
    this.afterBusinessLoaded();
  }

  public getVoucherWindow(): ReservationWindow {
    return TemplateUtil.getWindow(FormWindowName.VOUCHER, this.template);
  }

  public getServiceWindow(): ReservationWindow {
    return TemplateUtil.getWindow(FormWindowName.SERVICE, this.template);
  }

  public getServiceGroupWindow(): ReservationWindow {
    return TemplateUtil.getWindow(FormWindowName.SERVICE_GROUP, this.template);
  }

  public getBusinessBranchWindow(): ReservationWindow {
    return TemplateUtil.getWindow(FormWindowName.BUSINESS_BRANCH, this.template);
  }

  public getSummaryWindow(): ReservationWindow {
    return TemplateUtil.getWindow(FormWindowName.SUMMARY, this.template);
  }

  public saveTemplate(callback?: (data?: any) => void, template?: ReservationTemplate): void {
    if (template) {
      this.template = template;
    }
    this.http.put(Api.TEMPLATE + '/' + this.template.id, this.template,
      // tslint:disable-next-line:no-shadowed-variable
      (template: ReservationTemplate) => {
        this.template = template;
        this.fire(Event.BUSINESS_OR_TEMPLATE_CHANGED, this.business);
        if (callback) {
          callback();
        }
      });
  }

  public saveBusiness(callback?: (data?: any) => void): void {
    this.business.url = StringUtil.cleanupUrl(this.business.url);
    this.http.put(Api.BUSINESS + '/' + this.business.id, this.business,
      () => {
        this.fire(Event.BUSINESS_OR_TEMPLATE_CHANGED, this.business);
        if (callback) {
          callback();
        }
      });
  }

  public handleNewBusinessesCreatedFromDashboard(business: Business): void {
    if (!this.businesses) {
      this.businesses = [];
    }
    this.businesses.push(business);
    this.switchBusiness(this.businesses.length - 1)
  }

  public switchBusiness(idx: number): void {
    this.business = this.businesses[idx];
    this.fire(Event.BUSINESS_OR_TEMPLATE_CHANGED, this.business);
    this.afterBusinessLoaded();
  }

  public loadPayment() {
    this.http.get(Api.PAYMENT + '/' + this.userService.user.id, (payment: Payment) => {
        this.payment = payment;
        if (payment.valid || this.processingPayment) {
          this.modalService.close();
        } else {
          this.fire(Event.USER_AFTER_PAYMENT);
        }
      }
    )
  }

  private afterBusinessLoaded(): void {
    this.fire(Event.BUSINESSES_LOADED, this.business);
    this.http.get(Api.TEMPLATE + '/' + this.business.templateId,
      (template: ReservationTemplate) => {
        this.template = template;
        for (const window of this.template.windows) {
          if (window && window.config == null) {
            window.config = new ReservationWindowConfig();
          }
        }
      }
    );
  }

}

