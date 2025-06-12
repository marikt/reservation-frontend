import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NotadoWidgetUtil} from '../../../util/notado-widget-util';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {ReservationButton, ReservationButtonConfig} from '../../../../model/reservation-button';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpStatus} from '../../../../../../projects/notado-lib/src/lib/util/http-status';
import {ServiceMax} from '../../../../../../projects/notado-lib/src/lib/model/service-max';
import {Service} from '../../../../../../projects/notado-lib/src/lib/model/service';
import {NgForOf, NgIf} from '@angular/common';
import {VideoTutorialComponent} from '../../../video-tutorial/video-tutorial.component';
import {
  DashboardButtonCustomWebForServiceComponent
} from '../dashboard-button-custom-web-for-service/dashboard-button-custom-web-for-service.component';
import {RouterLink} from '@angular/router';
import {BrowserFrameComponent} from '../../../intro/browser-frame/browser-frame.component';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {VideoGuideComponent} from '../../../video-guide/video-guide.component';
import {ServiceGroup} from '../../../../../../projects/notado-lib/src/lib/model/service-group';
import {
  DashboardButtonCustomWebForServiceGroupComponent
} from '../dashboard-button-custom-web-for-service-group/dashboard-button-custom-web-for-service-group.component';
import {FormUrlPipe} from '../../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

@Component({
  selector: 'app-dashboard-button-custom-web',
  templateUrl: './dashboard-button-custom-web.component.html',
  styleUrls: ['./dashboard-button-custom-web.component.scss'],
  imports: [
    NgIf,
    TranslateModule,
    VideoTutorialComponent,
    DashboardButtonCustomWebForServiceComponent,
    RouterLink,
    BrowserFrameComponent,
    FormsModule,
    ColorPickerModule,
    VideoGuideComponent,
    NgForOf,
    DashboardButtonCustomWebForServiceGroupComponent
  ],
  standalone: true
})
export class DashboardButtonCustomWebComponent implements OnInit {

  @Input('service')
  public service: ServiceMax;

  @Input('serviceGroup')
  public serviceGroup: ServiceGroup;

  public services: Service[];

  public widgetLink: string;
  public iframeLink: string;
  protected calendarAvailabilityLink: string;
  public colorBackgroundBorder: string;
  public colorLabelBorder: string;
  public showValidation: boolean;
  public glow: boolean;
  public showFrame: boolean;
  public formSize: string;
  public activeCard: string = 'WIDGET';
  public widgetType: WidgetType = WidgetType.POP_UP;
  public buttonCode: string;
  public linkCode: string;
  public qrCodeImage: string;
  public showButtonEditor: boolean = false;
  public reservationButtonConfig: ReservationButtonConfig;

  constructor(
    public dashboardService: DashboardService,
    private alertService: AlertService,
    public formUrlPipe: FormUrlPipe,
    public translate: TranslateService,
    public modalService: ModalService,
    public http: HttpService
  ) {
  }

  ngOnInit() {
    this.http.get(Api.SERVICE + '/by-business/'  + this.dashboardService.business.id, (services: Service[]) => {
      this.services = services;
    });

    this.http.get(Api.RESERVATION_BUTTON + '/' + this.dashboardService.business.id,
      (formButton: ReservationButton) => {
        this.reservationButtonConfig = formButton.config;
        this.setBorderBackgroundColor();
        this.setBorderLabelColor();
        this.updateHtml();

      },
      (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          this.reservationButtonConfig = new ReservationButtonConfig();
          this.reservationButtonConfig.buttonPosition = 'RELATIVE';
          this.reservationButtonConfig.colorBackground = '#693BDA';
          this.reservationButtonConfig.colorLabel = '#ffff';
          this.reservationButtonConfig.radius = '8px';
          this.reservationButtonConfig.label = this.translate.instant('DASHBOARD.BUTTON.CUSTOM.ORDER');
          const reservationButton: ReservationButton = new ReservationButton();
          reservationButton.businessId = this.dashboardService.business.id;
          reservationButton.config = this.reservationButtonConfig;
          this.http.post(Api.RESERVATION_BUTTON + '/' + this.dashboardService.business.id, reservationButton,
            (formButton: ReservationButton) => {
              this.reservationButtonConfig = formButton.config;
              this.setBorderBackgroundColor();
              this.setBorderLabelColor();
              this.updateHtml();

            });
        }
      });

    this.formSize = 'SMALL_FORM';
    this.glow = false;
    this.showFrame = false;
  }

  public setBorderBackgroundColor(): void {
    const colorNo: number = Number('0x' + this.reservationButtonConfig.colorBackground.substr(1, this.reservationButtonConfig.colorBackground.length));
    // tslint:disable-next-line:no-bitwise
    this.colorBackgroundBorder = '2px solid #' + (((colorNo) & 0xfefefe) >> 1).toString(16);
  }

  public setBorderLabelColor() {
    const colorNo: number = Number('0x' + this.reservationButtonConfig.colorLabel.substr(1, this.reservationButtonConfig.colorLabel.length));
    // tslint:disable-next-line:no-bitwise
    this.colorLabelBorder = '2px solid #' + (((colorNo) & 0xfefefe) >> 1).toString(16);
  }

  public copyButtonLink(showAlert?: boolean): void {
    this.updateHtml();
    switch (this.activeCard) {
      case 'WIDGET':
        navigator.clipboard.writeText(this.widgetLink).then().catch(e => console.log(e));


        const reservationButton: ReservationButton = new ReservationButton();
        reservationButton.businessId = this.dashboardService.business.id;
        reservationButton.config = this.reservationButtonConfig;

        this.http.put(Api.RESERVATION_BUTTON + '/' + this.dashboardService.business.id, reservationButton,
          (reservationButton) => {
            this.http.post(Api.RESERVATION_BUTTON + '/create-script/' + this.dashboardService.business.id,
              {
                script: NotadoWidgetUtil.createWidgetJavascriptFileContent(
                  this.dashboardService.business.id,
                  this.reservationButtonConfig.label,
                  this.reservationButtonConfig.buttonPosition,
                  this.formUrlPipe.transform(this.dashboardService.business.url)
                ),
                style: NotadoWidgetUtil.createWidgetStyleFileContent(
                  this.dashboardService.business.id,
                  this.reservationButtonConfig.colorBackground,
                  this.reservationButtonConfig.colorLabel,
                  this.reservationButtonConfig.label,
                  this.reservationButtonConfig.radius,
                  this.formSize,
                  this.reservationButtonConfig.buttonPosition,
                  this.widgetType,
                  WidgetFor.BUSINESS,
                  null
                )
              });
          });
        break;
      case 'BUTTON':
        navigator.clipboard.writeText(this.buttonCode).then().catch(e => console.log(e));
        break;
      case 'LINK':
        navigator.clipboard.writeText(this.linkCode).then().catch(e => console.log(e));
        break;
      case 'IFRAME':
        navigator.clipboard.writeText(this.iframeLink).then().catch(e => console.log(e));
        break;
      case 'CALENDAR_AVAILABILITY':
        navigator.clipboard.writeText(this.calendarAvailabilityLink).then().catch(e => console.log(e));
        break;
    }

    this.alertService.addInfo(this.translate.instant('ALERT.BUTTON_CODE'))
  }

  public downloadQRImage() {
    // @ts-ignore
    const element = document.getElementsByClassName('qrcode').item(0);
    // @ts-ignore
    this.qrCodeImage = element.firstChild.currentSrc;
  }

  // ' + this.formUrlPipe.transform(this.dashboardService.business.url) + '

  private updateHtml(): void {
    const businessId = this.dashboardService.business.id;
    this.widgetLink = NotadoWidgetUtil.createWidgetLink(
      businessId,
      this.reservationButtonConfig.label,
      this.reservationButtonConfig.buttonPosition,
      this.formUrlPipe.transform(this.dashboardService.business.url));
    this.buttonCode = '<a id="' + NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS) + '" href="' + this.formUrlPipe.transform(this.dashboardService.business.url) + '" target="_blank" style="background: ' + this.reservationButtonConfig.colorBackground + '; color: ' + this.reservationButtonConfig.colorLabel + '; padding: 10px 18px' + '; border-radius: ' + this.reservationButtonConfig.radius + '; ' + NotadoWidgetUtil.computePosition(this.reservationButtonConfig.buttonPosition) + 'border: 1px solid;" >' + this.reservationButtonConfig.label + '</a> \n';
    this.iframeLink = '<iframe width="100%" height="900" src="' + this.formUrlPipe.transform(this.dashboardService.business.url) + '" frameborder="0"></iframe>';
    this.linkCode = this.formUrlPipe.transform(this.dashboardService.business.url);
    this.calendarAvailabilityLink = '<iframe width="100%" height="1000" scrolling="no" src="' + this.formUrlPipe.transform(this.dashboardService.business.url) + '/calendar-availability" frameborder="0"></iframe>';
  }

  public computePositionOfDemoButton(): string {
    switch (this.reservationButtonConfig.buttonPosition) {
      case 'RELATIVE':
        return 'position: absolute; top: 140px;';
      case 'BOTTOM_RIGHT':
        return 'position: absolute; top: 200px; left: 80%;';
      case 'BOTTOM_LEFT':
        return 'position: absolute; top: 200px;';
      case 'TOP_RIGHT':
        return 'position: absolute; top: 20px; left: 80%;';
    }
  }

}

export enum WidgetType {
    FIRST = 'FIRST', // ignore
    POP_UP = 'POP_UP',
    RIGHT_SIDE = 'RIGHT_SIDE'
}
export enum WidgetFor {
    SERVICE = 'SERVICE',
    SERVICE_GROUP = 'SERVICE_GROUP',
    BUSINESS = 'BUSINESS'
}
