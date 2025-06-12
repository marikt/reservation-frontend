import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NotadoWidgetUtil} from '../../../util/notado-widget-util';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {Server} from '../../../../../../projects/notado-lib/src/config/server';
import {NgIf} from '@angular/common';
import {TextShortPipe} from '../../../../../../projects/notado-lib/src/lib/pipe/text-short.pipe';
import {WidgetFor, WidgetType} from '../dashboard-button-custom-web/dashboard-button-custom-web.component';
import {ServiceGroup} from '../../../../../../projects/notado-lib/src/lib/model/service-group';
import {FormUrlPipe} from '../../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

@Component({
  selector: 'app-dashboard-button-custom-web-for-service-group',
  templateUrl: './dashboard-button-custom-web-for-service-group.component.html',
  styleUrls: ['./dashboard-button-custom-web-for-service-group.component.scss'],
  imports: [
    NgIf,
    TranslateModule,
    TextShortPipe
  ],
  standalone: true
})
export class DashboardButtonCustomWebForServiceGroupComponent implements OnInit {

  @Input('serviceGroupName') public serviceGroupName: string;
  @Input('serviceGroup') public serviceGroup: ServiceGroup;
  @Input('radius') public radius: string;
  @Input('formSize') public formSize: string;
  @Input('colorBackground') public colorBackground: string;
  @Input('colorLabel') public colorLabel: string;
  @Input('label') public label: string;

  public widgetCode: string;
  public activeCard: string = 'WIDGET';
  public buttonCode: string;
  public linkCode: string;
  public qrCodeImage: string;

  constructor(
    public dashboardService: DashboardService,
    private alertService: AlertService,
    private formUrlPipe: FormUrlPipe,
    public translate: TranslateService,
    public modalService: ModalService,
    public server: Server,
  ) {
  }

  ngOnInit() {
    this.updateHtml();
  }

  public copyButtonLink(): void {
    this.updateHtml();
    switch (this.activeCard) {
      case 'WIDGET':
        navigator.clipboard.writeText(this.widgetCode).then().catch(e => console.log(e));
        break;
      case 'BUTTON':
        navigator.clipboard.writeText(this.buttonCode).then().catch(e => console.log(e));
        break;
      case 'LINK':
        navigator.clipboard.writeText(this.linkCode).then().catch(e => console.log(e));
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
    const serviceGroupId = this.serviceGroup.id;
    this.widgetCode = NotadoWidgetUtil.createWidgetFor(
      businessId,
      this.colorBackground,
      this.colorLabel,
      this.label,
      this.radius,
      this.formSize,
      'RELATIVE',
      this.formUrlPipe.transform(this.dashboardService.business.url),
      WidgetType.POP_UP,
      WidgetFor.SERVICE_GROUP,
      serviceGroupId
    );
    // tslint:disable-next-line:max-line-length
    this.buttonCode = '<a id="' + NotadoWidgetUtil.buttonShow(businessId, WidgetFor.SERVICE_GROUP, serviceGroupId) + '" href="' + NotadoWidgetUtil.urlFor(this.formUrlPipe.transform(this.dashboardService.business.url), WidgetFor.SERVICE_GROUP, serviceGroupId) + ' " target="_blank" style="background: ' + this.colorBackground + '; color: ' + this.colorLabel + '; padding: 10px 18px' + '; border-radius: ' + this.radius + '; border: 1px solid;" >' + this.label + '</a> \n';
    this.linkCode = NotadoWidgetUtil.urlFor(this.formUrlPipe.transform(this.dashboardService.business.url), WidgetFor.SERVICE_GROUP, serviceGroupId);
  }

}
