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
import {ServiceGroupInRelation} from '../../../../../projects/notado-lib/src/lib/model/service-group-in-relation';
import {BusinessBranch} from '../../../../../projects/notado-lib/src/lib/model/business-branch';
import {ServiceInRelation} from '../../../../../projects/notado-lib/src/lib/model/service-in-relation';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgForOf, NgIf} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {FormsModule} from '@angular/forms';
import {ImageResizeComponent} from '../../image-resize/image-resize.component';
import {FileUploadModule} from 'ng2-file-upload';
import {SafeUrlPipe} from '../../../pipe/safe-url.pipe';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {OpeningDay} from '../../../../../projects/notado-lib/src/lib/model/opening-day';
import {OpeningItemComponent} from '../../util/opening-item/opening-item.component';

@Component({
  selector: 'app-dashboard-business-branch-item',
  templateUrl: './dashboard-business-branch-item.component.html',
  styleUrls: ['./dashboard-business-branch-item.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    NgIf,
    DashboardCardComponent,
    TranslateModule,
    FormsModule,
    NgForOf,
    ImageResizeComponent,
    FileUploadModule,
    SafeUrlPipe,
    VideoTutorialComponent,
    OpeningItemComponent
  ],
  standalone: true
})
export class DashboardBusinessBranchItemComponent extends Uploader implements OnInit {

  public showValidation: boolean;
  public businessBranch: BusinessBranch;
  public servicesInRelation: ServiceInRelation[] = [];
  public serviceGroupsInRelation: ServiceGroupInRelation[] = [];
  public openingDays: OpeningDay[];
  public scheduleType: string;

  public imgs: PexelImg[] = [];
  protected searchKey: string;
  public location: string;


  @ViewChild('businessBranchImageUpload')
  public businessBranchImageUpload: any;
  public activeCard: string = 'BASIC';

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
      const url = Api.BUSINESS_BRANCH + '/' + this.businessBranch.id + '/file';
      this.http.postFile(url, img, () => {
        this.modalService.close();
        this.resizeImageService.reset();
        if (this.businessBranch) {
          this.http.get(Api.BUSINESS_BRANCH + '/' + this.businessBranch.id, (service: ServiceMax) => {
            this.businessBranch.img = service.img;
            this.businessBranch.fullPathImg = service.fullPathImg;
          });
        }
      });
    };

    this.http.get(Api.BUSINESS_BRANCH + '/' + this.route.snapshot.params.businessBranchId,
      (businessBranch: BusinessBranch) => {
        this.businessBranch = businessBranch;

        if (this.businessBranch.location) {
          this.location = this.businessBranch.location;
        }
        
        // Load opening days for business branch
        this.http.get(Api.OPENING_DAY + '/for-business-branch/' + this.businessBranch.id,
          (openingDays: OpeningDay[]) => {
            this.openingDays = openingDays;
            this.scheduleType = (!this.openingDays || this.openingDays.length === 0) ? 'defaultSchedule' : 'customeSchedule';
          }, 
          () => {
            // If the API endpoint doesn't exist yet, initialize with empty array
            console.warn('API endpoint for business branch opening days not found');
            this.openingDays = [];
            this.scheduleType = 'defaultSchedule';
          });
          
        this.http.get(Api.RELATION + '/' + this.dashboardService.business.id + '/' + this.businessBranch.id + '/service-relation-for-business-branch',
          (servicesInRelation: ServiceInRelation[]) => {
            this.servicesInRelation = servicesInRelation;
          });
        this.http.get(Api.RELATION + '/' + this.dashboardService.business.id + '/' + this.businessBranch.id + '/service-group-relation-for-business-branch',
          (serviceGroupInRelation: ServiceGroupInRelation[]) => {
            this.serviceGroupsInRelation = serviceGroupInRelation;
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

  public deleteBusinessBranch(): void {
    this.http.delete(Api.BUSINESS_BRANCH + '/' + this.businessBranch.id, () => {
      this.modalService.close();
      this.alertService.addInfo(this.translate.instant('ALERT.BRANCH_DELETED'));
      this.router.navigate(['/dashboard/dashboard-business-branch']);
    });
  }

  public saveBusinessBranch() {
    this.preventDoubleClickService.preventFor();
    const serviceIds: number[] = [];
    this.servicesInRelation.forEach(s => {
      if (s.active) {
        serviceIds.push(s.service.id);
      }
    })
    this.http.put(Api.RELATION + '/' + this.businessBranch.id + '/service-relation-for-business-branch',
      serviceIds, () => {
      });
    const serviceGroupIds: number[] = [];
    this.serviceGroupsInRelation.forEach(sg => {
      if (sg.active) {
        serviceGroupIds.push(sg.serviceGroup.id);
      }
    })
    this.http.put(Api.RELATION + '/' + this.businessBranch.id + '/service-group-relation-for-business-branch',
      serviceGroupIds, () => {
      });
      
    // Save opening days for business branch
    if (this.openingDays && this.openingDays.length > 0) {
      this.http.put(Api.OPENING_DAY + '/for-business-branch/' + this.businessBranch.id, this.openingDays, 
        () => {
          console.log('Business branch opening days saved successfully');
        },
        (error) => {
          console.warn('Failed to save business branch opening days:', error);
          // If the API endpoint doesn't exist, show a message to the user
          this.alertService.addWarning(this.translate.instant('ALERT.OPENING_DAYS_NOT_SAVED'));
        });
    }

    this.http.put(Api.BUSINESS_BRANCH + '/' + this.businessBranch.id, this.businessBranch,
      () => {
        this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
        this.router.navigate(['/dashboard/dashboard-business-branch']);
      });
  }

  public selectPexelImg(imgUrl: string): void {
    this.resizeImageService.state = CropState.IMG_SELECTED;
    this.resizeImageService.setImgUrl(imgUrl);
  }

  public openImageModal(): void {
    this.modalService.open(this.businessBranchImageUpload);
    this.searchKey = this.businessBranch.name;
    this.searchForPexelImg();
  }

  public deleteImg(): void {
    this.http.delete(Api.BUSINESS_BRANCH + '/' + this.businessBranch.id + '/img', () => {
    });
  };

  public setBusinessLocation() {
    if (this.location && this.location.includes('<iframe')) {
      this.location = this.extractSrcFromIframe(this.location);
    }
    this.businessBranch.location = this.location;
  }

  private extractSrcFromIframe(iframeHtml: string): string | null {
    const regex = /<iframe.*?src="(.*?)".*?><\/iframe>/;
    const match = iframeHtml.match(regex);
    return match ? match[1] : null;
  }
  
  public addOpeningDays(): void {
    this.openingDays = OpeningDay.getDefaultValue();
    this.http.put(Api.OPENING_DAY + '/for-business-branch/' + this.businessBranch.id, this.openingDays,
      () => {
        console.log('Business branch opening days added successfully');
      },
      (error) => {
        console.warn('Failed to add business branch opening days:', error);
      });
  }

  public removeOpeningDays(): void {
    this.openingDays = [];
    this.http.put(Api.OPENING_DAY + '/for-business-branch/' + this.businessBranch.id, this.openingDays,
      () => {
        console.log('Business branch opening days removed successfully');
      },
      (error) => {
        console.warn('Failed to remove business branch opening days:', error);
      });
  }
}
