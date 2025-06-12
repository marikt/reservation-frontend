import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ServiceMax} from '../../../../../projects/notado-lib/src/lib/model/service-max';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {TypeaheadService} from '../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {CropState, ResizeImageService} from '../../../service/resize-image.service';
import {PexelImg} from '../../../model/pexel-img';
import {PexelService} from '../../../service/pexel.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {ServiceBadge, ServiceConfig} from '../../../../../projects/notado-lib/src/lib/model/service-config';
import {GoogleTranslateService} from '../../../service/google-translate.service';
import {DashboardServiceItemCommonComponent} from '../dashboard-service-item/dashboard-service-item-common.component';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {FormsModule} from '@angular/forms';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {CalendarDropdownWithRefreshComponent} from '../../util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {
  NgbDateStruct,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbInputDatepicker,
  NgbTooltip
} from '@ng-bootstrap/ng-bootstrap';
import {ImageResizeComponent} from '../../image-resize/image-resize.component';
import {FileUploadModule} from 'ng2-file-upload';
import {LineService} from '../../../service/line.service';
import {ServiceService} from '../../../service/service.service';
import {StripeCoupon} from '../../../../../projects/notado-lib/src/lib/model/stripe-coupon';
import {StripePrice} from '../../../../../projects/notado-lib/src/lib/model/stripe-price';
import {StripeIntegrationService} from '../../../service/stripe-integration-service';
import {StripePriceDropdownComponent} from '../../util/stripe-price-dropdown/stripe-price-dropdown.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {
  FormServiceItemWithDescriptionWindowComponent
} from '../../../../../projects/notado-lib/src/lib/component/form-window/form-service-item-with-description-window/form-service-item-with-description-window.component';
import {DashboardButtonCustomWebComponent} from '../button/dashboard-button-custom-web/dashboard-button-custom-web.component';
import {FormService} from '../../../../../projects/notado-lib/src/lib/service/form.service';
import {CouponValidityType, StripeCouponConfig} from '../../../../../projects/notado-lib/src/lib/model/stripe-coupon-config';
import {MyDate} from '../../../../../projects/notado-lib/src/lib/model/date';
import {KeywordHighlighterComponent} from '../../util/keyword-highlighter/keyword-highlighter.component';
import {VideoGuideComponent} from '../../video-guide/video-guide.component';

@Component({
  selector: 'app-dashboard-coupon-item',
  templateUrl: './dashboard-coupon-item.component.html',
  styleUrls: ['./dashboard-coupon-item.component.scss'],
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
    FileUploadModule,
    StripePriceDropdownComponent,
    DashboardCardComponent,
    DashboardCardLabelComponent,
    FormServiceItemWithDescriptionWindowComponent,
    DashboardButtonCustomWebComponent,
    JsonPipe,
    NgbInputDatepicker,
    KeywordHighlighterComponent,
    VideoGuideComponent
  ],
  standalone: true
})
export class DashboardCouponItemComponent extends DashboardServiceItemCommonComponent implements OnInit {

  public imgs: PexelImg[] = [];
  public searchKey: string;
  public stripePriceName: string;
  public stripeCoupons: StripeCoupon[];


  @ViewChild('serviceImageUpload')
  public serviceImageUpload: any;
  public noCoursesFound: boolean = false;
  public couponUsageType: string = 'ONE_TIME_COUPON';
  public model: NgbDateStruct;
  public today: MyDate = new MyDate();
  public activeCard: string = 'BASIC';

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    private route: ActivatedRoute,
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
    public serviceService: ServiceService,
    public stripeIntegrationService: StripeIntegrationService,
    public formService: FormService
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
    this.http.get(Api.SERVICE + '/' + this.route.snapshot.params.couponId, (service: ServiceMax) => {
      this.service = service;
      this.ngOnInitImgUpload();
      this.setUpStripeCouponConfigDefaultValues(this.service.stripeCouponConfig);
      if (this.service.stripeCouponConfig.noOfUsage === 1) {
        this.couponUsageType = 'ONE_TIME_COUPON'
      } else {
        this.couponUsageType = 'MULTIPLE_TIME_COUPON'
      }
      if (service.name === 'coupon') {
        service.name = '';
      }
      this.ngOnInitAfterCouponLoad();
    });
    this.loadCoupons();
    this.formService.loadTemplateForDashboard(this.dashboardService.business);
  }

  public loadCoupons(): void {
    this.http.get(Api.FORM_PAYMENT + '/' + this.dashboardService.business.id + '/coupon', (stripeCoupons: StripeCoupon[]) => {
      this.stripeCoupons = stripeCoupons;
    });
  }

  private ngOnInitImgUpload() {
    this.resizeImageService.reset();
    this.resizeImageService.onCropCallback = (img) => {
      this.http.postFile(Api.SERVICE + '/' + this.service.id + '/file', img, () => {
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

  private ngOnInitAfterCouponLoad() {
    this.stripeIntegrationService.init();
    if (!this.service.config) {
      this.service.config = new ServiceConfig();
      this.service.config.badge = new ServiceBadge();
    }

    if (!this.service.config.rating) {
      this.service.config.rating = 0;
    }
  }

  public saveService() {
    if (this.couponUsageType === 'ONE_TIME_COUPON') {
      this.service.stripeCouponConfig.noOfUsage = 1;
    }
    this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).paymentMandatory = true;
    this.stripeIntegrationService.saveStripeIntegration();
    super.saveService();
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

  public deleteImg(): void {
    this.http.delete(Api.SERVICE + '/' + this.service.id + '/img', () => {
    });
  };

  public loadPrice(stripePrices: StripePrice[]) {
    if (!stripePrices || !this.service) {
      return;
    }
    for (const stripePrice of stripePrices) {
      if (stripePrice.id === this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).price) {
        this.stripePriceName = stripePrice.productName + ': ' + stripePrice.price + ',-';
        return;
      }
    }
  }

  public setPrice(stripePrice: StripePrice) {
    this.stripePriceName = stripePrice.productName + ': ' + stripePrice.price + ',-';
    this.service.price = stripePrice.price;
    this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).price = stripePrice.id
  }

  public isValid(): boolean {
    if (!this.service.stripeCouponId) {
      return false;
    }
    if (!this.service.name || this.service.name === '') {
      return false;
    }
    if (!this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).price) {
      return false;
    }

    return true;

  }

  private setUpStripeCouponConfigDefaultValues(stripeCouponConfig: StripeCouponConfig) {
    if (!this.service.stripeCouponConfig) {
      this.service.stripeCouponConfig = new StripeCouponConfig();
    }
    if (!this.service.stripeCouponConfig.noOfUsage) {
      this.service.stripeCouponConfig.noOfUsage = 1;
    }
    if (!this.service.stripeCouponConfig.validTill) {
      this.service.stripeCouponConfig.validTill = new MyDate();
    }
    if (!this.service.stripeCouponConfig.validityType) {
      this.service.stripeCouponConfig.validityType = CouponValidityType.NO_LIMIT;
    }
  }

  public get couponValidityType(): typeof CouponValidityType {
    return CouponValidityType;
  }


}
