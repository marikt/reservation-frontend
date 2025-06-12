import {Component, OnInit, ViewChild} from '@angular/core';
import {Uploader} from '../../../util/uploader';
import {ServiceMax} from '../../../../../projects/notado-lib/src/lib/model/service-max';
import {PexelImg} from '../../../model/pexel-img';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeaheadService} from '../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {CropState, ResizeImageService} from '../../../service/resize-image.service';
import {PexelService} from '../../../service/pexel.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ServiceGroup} from '../../../../../projects/notado-lib/src/lib/model/service-group';
import {ServiceInRelation} from '../../../../../projects/notado-lib/src/lib/model/service-in-relation';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ImageResizeComponent} from '../../image-resize/image-resize.component';
import {FileUploadModule} from 'ng2-file-upload';
import {DashboardButtonCustomWebComponent} from '../button/dashboard-button-custom-web/dashboard-button-custom-web.component';
import {ServiceType} from '../../../../../projects/notado-lib/src/lib/enum/service-type';

@Component({
  selector: 'app-dashboard-service-group-item',
  templateUrl: './dashboard-service-group-item.component.html',
  styleUrls: ['./dashboard-service-group-item.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    NgIf,
    TranslateModule,
    FormsModule,
    NgbTooltip,
    ImageResizeComponent,
    FileUploadModule,
    NgForOf,
    DashboardButtonCustomWebComponent
  ],
  standalone: true
})
export class DashboardServiceGroupItemComponent extends Uploader implements OnInit {

  public showValidation: boolean;
  public serviceGroup: ServiceGroup;
  public services: ServiceMax[];
  public servicesInRelation: ServiceInRelation[] = [];
  public couponsInRelation: ServiceInRelation[] = [];

  public imgs: PexelImg[] = [];
  protected searchKey: string;
  public maxParallelBookingActive: boolean = false;

  @ViewChild('serviceGroupImageUpload')
  public serviceGroupImageUpload: any;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    private route: ActivatedRoute,
    public router: Router,
    public typeaheadService: TypeaheadService,
    public modalService: ModalService,
    public resizeImageService: ResizeImageService,
    private pexelService: PexelService,
    public server: Server,
    public translate: TranslateService,
    public preventDoubleClickService: PreventDoubleClickService
  ) {
    super(alertService, broadcastService, http);
  }

  ngOnInit() {

    this.resizeImageService.reset();
    this.resizeImageService.onCropCallback = (img) => {
      const url = Api.SERVICE_GROUP + '/' + this.serviceGroup.id + '/file';
      this.http.postFile(url, img, () => {
        this.modalService.close();
        this.resizeImageService.reset();
        if (this.serviceGroup) {
          this.http.get(Api.SERVICE_GROUP + '/' + this.serviceGroup.id, (service: ServiceMax) => {
            this.serviceGroup.img = service.img;
            this.serviceGroup.fullPathImg = service.fullPathImg;
          });
        }
      });
    };

    this.http.get(Api.SERVICE_GROUP + '/' + this.route.snapshot.params.serviceGroupId,
      (serviceGroup: ServiceGroup) => {
        this.serviceGroup = serviceGroup;
        this.maxParallelBookingActive = !(this.serviceGroup.maxParallelBooking == null);
        this.http.get(Api.RELATION + '/' + this.dashboardService.business.id + '/' + this.serviceGroup.id + '/service-relation-for-service-group',
          (servicesInRelation: ServiceInRelation[]) => {
            this.servicesInRelation = servicesInRelation.filter(s => s.service.type !== ServiceType.COUPON);
            this.couponsInRelation = servicesInRelation.filter(s => s.service.type === ServiceType.COUPON);
          });
      });

    this.initUploaderForCroper((imgUrl) => {
      this.resizeImageService.state = CropState.IMG_SELECTED;
      this.resizeImageService.setImgUrl(imgUrl);
    }, 350);
  }

  public searchForPexelImg() {
    this.pexelService.getImages(this.searchKey, (imgs: PexelImg[]) => {
      this.imgs = imgs.filter(img => img.width > img.height);
    }, 12);
  }

  public deleteServiceGroup(): void {
    this.http.delete(Api.SERVICE_GROUP + '/' + this.serviceGroup.id, () => {
      this.modalService.close();
      this.alertService.addInfo(this.translate.instant('ALERT.GROUP_DELETED'));
      this.router.navigate(['/dashboard/dashboard-service-group']);
    });
  }

  public saveServiceGroup() {
    this.preventDoubleClickService.preventFor();
    const serviceIds: number[] = [];
    this.servicesInRelation.forEach(s => {
      if (s.active) {
        serviceIds.push(s.service.id);
      }
    });

    this.couponsInRelation.forEach(s => {
      if (s.active) {
        serviceIds.push(s.service.id);
      }
    });

    this.http.put(Api.RELATION + '/' + this.serviceGroup.id + '/service-relation-for-service-group', serviceIds);

    this.http.put(Api.SERVICE_GROUP + '/' + this.serviceGroup.id, this.serviceGroup,
      () => {
        this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
      });
  }

  public selectPexelImg(imgUrl: string): void {
    this.resizeImageService.state = CropState.IMG_SELECTED;
    this.resizeImageService.setImgUrl(imgUrl);
  }

  public openImageModal(): void {
    this.modalService.open(this.serviceGroupImageUpload, {size: 'lg'});
    this.searchKey = this.serviceGroup.name;
    this.searchForPexelImg();
  }

  public deleteImg(): void {
    this.http.delete(Api.SERVICE_GROUP + '/' + this.serviceGroup.id + '/img', () => {
    });
  };

  public setMaxParallelBookingActive() {
    this.maxParallelBookingActive = !this.maxParallelBookingActive;
    if (!this.maxParallelBookingActive) {
      this.serviceGroup.maxParallelBooking = null;
    }
  }

}
