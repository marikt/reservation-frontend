import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {Server} from '../../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormService} from '../../../../../../projects/notado-lib/src/lib/service/form.service';
import {Router} from '@angular/router';
import {FormConfigService} from '../../../../service/form-config.service';
import {FormWindowName} from '../../../../../../projects/notado-lib/src/lib/util/form-window-name';
import {FormType} from '../../../../../../projects/notado-lib/src/lib/util/form-type';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardFormConfigCardComponent} from '../dashboard-form-config-card/dashboard-form-config-card.component';
import {DashboardReservationFormGalleryComponent} from './dashboard-reservation-form-gallery/dashboard-reservation-form-gallery.component';
import {DashboardReservationFormCustomComponent} from './dashboard-reservation-form-custom/dashboard-reservation-form-custom.component';
import {NgForOf, NgIf} from '@angular/common';
import {DashboardFormWindowsComponent} from '../dashboard-form-windows/dashboard-form-windows.component';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {FormServiceComponent} from '../../../../../../projects/notado-lib/src/lib/component/form/form-service/form-service.component';
import {VideoGuideComponent} from '../../../video-guide/video-guide.component';
import {
  DashboardReservationFormVideoGalleryComponent
} from './dashboard-reservation-form-video-gallery/dashboard-reservation-form-video-gallery.component';
import {DashboardReservationFormFontComponent} from './dashboard-reservation-form-font/dashboard-reservation-form-font.component';
import {
  DashboardReservationFormRightDetailComponent
} from './dashboard-reservation-form-right-detail/dashboard-reservation-form-right-detail.component';
import {FormUrlPipe} from '../../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';
import {DashboardCardComponent} from '../../../../template/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-dashboard-reservation-form',
  templateUrl: './dashboard-reservation-form.component.html',
  styleUrls: ['./dashboard-reservation-form.component.scss'],
  imports: [
    TranslateModule,
    DashboardFormConfigCardComponent,
    DashboardReservationFormGalleryComponent,
    DashboardReservationFormCustomComponent,
    NgIf,
    DashboardFormWindowsComponent,
    NgbTooltip,
    FormServiceComponent,
    VideoGuideComponent,
    NgForOf,
    DashboardReservationFormVideoGalleryComponent,
    FormUrlPipe,
    DashboardReservationFormFontComponent,
    DashboardReservationFormRightDetailComponent,
    DashboardCardComponent
  ],
  standalone: true
})
export class DashboardReservationFormComponent implements OnInit {

  public activeCard: string = 'WINDOWS';
  // public activeCard: string = 'CUSTOM_FORM';
  // public activeCard: string = 'VIDEO_GALLERY';
  public mobileMode: boolean = false;
  public windowsItems: VerticalWindowMenuItem[] = [];

  constructor(
    public dashboardService: DashboardService,
    public formConfigService: FormConfigService,
    public alertService: AlertService,
    public server: Server,
    public formService: FormService,
    public translate: TranslateService,
    public router: Router,
    public preventDoubleClickService: PreventDoubleClickService
  ) {
  }

  ngOnInit() {
    this.formConfigService.registerHover();
    this.windowsItems.push(new VerticalWindowMenuItem('fas fa-city', this.dashboardService.template.windows[0].name));
    this.windowsItems.push(new VerticalWindowMenuItem('far fa-object-group', this.dashboardService.template.windows[1].name));
    this.windowsItems.push(new VerticalWindowMenuItem('fas fa-cut', this.dashboardService.template.windows[2].name));
    this.windowsItems.push(new VerticalWindowMenuItem('fas fa-arrows-alt-h', this.dashboardService.template.windows[3].name));
    this.windowsItems.push(new VerticalWindowMenuItem('far fa-calendar-alt', this.dashboardService.template.windows[4].name));
    this.windowsItems.push(new VerticalWindowMenuItem('fas fa-gift', this.dashboardService.template.windows[5].name));
    this.windowsItems.push(new VerticalWindowMenuItem('fas fa-sliders-h', this.dashboardService.template.windows[6].name));
    this.windowsItems.push(new VerticalWindowMenuItem('fas fa-sticky-note', this.dashboardService.template.windows[7].name));
    this.windowsItems.push(new VerticalWindowMenuItem('fas fa-user', this.dashboardService.template.windows[8].name));
    this.windowsItems.push(new VerticalWindowMenuItem('fas fa-clipboard-check', this.dashboardService.template.windows[9].name));
    this.windowsItems.push(new VerticalWindowMenuItem('far fa-paper-plane', this.dashboardService.template.windows[10].name));

    this.formService.init(this.dashboardService.business);
  }

  public saveFormTemplate(card: string): void {
    this.preventDoubleClickService.preventFor();
    if (card === 'WINDOWS') {
      // for WINDOWS we take template from dashboardService
      this.dashboardService.saveTemplate(
        () => {
          this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
          this.formConfigService.init(this.formConfigService.windowIdx);
        }
      );
    } else {
      this.dashboardService.saveTemplate(
        () => this.alertService.addInfo(this.translate.instant('ALERT.SAVED')),
        this.formService.template);
    }
  }

  public deleteBackgroundImage(): void {
    this.dashboardService.template.backgroundImg = null;
    this.dashboardService.template.fullPathImg = null;
  }

  public showForm(): void {
    // this.formService.template = null;
    this.formService.reset();
    this.formService.openReservationFormForDemo();
  }

  public backgroundImage(): string {
    if (this.formService.template && this.formService.template.backgroundImgFromGallery) {
      return 'url(\'../../../../../resources/form-gallery/' + this.formService.template.backgroundImg + '\') no-repeat scroll top center'
    }
    if (this.formService.template && this.formService.template.fullPathImg) {
      return 'url(\'' + this.server.SERVER + this.formService.template.fullPathImg + '\') no-repeat scroll top center'
    }
    return '';
  }

  public get formType(): typeof FormType {
    return FormType;
  }

}

export class VerticalWindowMenuItem {
  public icon: string;
  public windowName: FormWindowName;

  public constructor(icon: string, windowName: FormWindowName) {
    this.icon = icon;
    this.windowName = windowName;
  }
}

