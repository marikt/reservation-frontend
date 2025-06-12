import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {WizardService} from '../../../service/wizard.service';
import {PexelImg} from '../../../model/pexel-img';
import {PexelService} from '../../../service/pexel.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {CropState, ResizeImageService} from '../../../service/resize-image.service';
import {NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {MetaService} from '../../../service/meta.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {GoogleTranslateService} from '../../../service/google-translate.service';
import {Service} from '../../../../../projects/notado-lib/src/lib/model/service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {BusinessWizardRootComponent} from '../business-wizard-root.component';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import {ImageResizeComponent} from '../../image-resize/image-resize.component';

@Component({
  selector: 'app-business-wizard-service-img',
  templateUrl: './business-wizard-service-img.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    NgIf,
    TranslateModule,
    FormsModule,
    FileUploadModule,
    NgForOf,
    ImageResizeComponent
  ],
  standalone: true
})
export class BusinessWizardServiceImgComponent extends BusinessWizardRootComponent {

  @ViewChild('serviceImageCropModal')
  public serviceImageCropModal: any;

  public imgs: PexelImg[] = [];
  public searchKey: string;

  constructor(
    public wizardService: WizardService,
    public googleTranslateService: GoogleTranslateService,
    public route: ActivatedRoute,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public pexelService: PexelService,
    public modalService: ModalService,
    public resizeImageService: ResizeImageService,
    public router: Router,
    public metaService: MetaService,
    public languageService: LanguageService) {
    super(alertService, broadcastService, http, route, router);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.reset();
  }

  public search() {
    this.pexelService.getImages(this.searchKey, (imgs: PexelImg[]) => {
      this.imgs = imgs.filter(img => img.width > img.height);
    }, 12);
  }
  public onSubmit() {
  }

  public openModal(imgUrl: string, options?: NgbModalOptions) {
    this.modalService.open(this.serviceImageCropModal, options);
    this.resizeImageService.setImgUrl(imgUrl);
    this.resizeImageService.onCropCallback = () => {
      this.modalService.close();
    }
  }

  public reset(): void {
    this.resizeImageService.reset();
    this.idx = this.route.snapshot.params.idx;
    this.initUploaderForCroper((imgUrl) => {
      this.openModal(imgUrl);
    }, 350);

    if (this.wizardService.services) {
      const service: Service = this.wizardService.services[this.idx];
      this.searchKey = service.name;
      this.googleTranslateService.translate(this.searchKey, this.languageService.language, (translation) => {
        this.searchKey = translation
        this.search();
      });
    }
  }

  public goToNextScreen(): void {
    if (this.resizeImageService.state === CropState.CROPED) {
      fetch(this.resizeImageService.cropedImgBase64)
        .then(res => res.blob())
        .then(blob => {
          const url = Api.SERVICE + '/' + this.wizardService.services[this.idx].id + '/file';
          this.http.postFile(url, blob, () => {
            this.wizardService.next('business-wizard-service-name/' + this.getNextIndex());
          })
        });
    } else {
      this.wizardService.next('business-wizard-service-name/' + this.getNextIndex());
    }
  }

}

