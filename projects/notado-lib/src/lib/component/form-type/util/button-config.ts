import {Directive, Input, OnInit} from '@angular/core';
import {ReservationWindowConfig} from '../../../model/reservation-form/reservation-window-config';
import {FormService} from '../../../service/form.service';
import {HttpService} from '../../../service/http.service';
import {SpinnerService} from '../../../service/spinner.service';
import {TemplateUtil} from '../../../util/template-util';
import {FormWindowName} from '../../../util/form-window-name';
import {ReservationWindow} from '../../../model/reservation-form/reservation-window';
import {ServiceMax} from '../../../model/service-max';

@Directive()
export class ButtonConfig implements OnInit {

  @Input('cardName')
  public cardName: string;

  public config: ReservationWindowConfig;


  constructor(public formService: FormService,
              public http: HttpService,
              public spinnerService: SpinnerService
  ) {
    this.readData();
  }

  ngOnInit(): void {
  }

  public nextFormWindow(): void {
    if (!this.formService.validateComponents()) {
      console.log('formService.validateComponents INVALID!')
      return;
    }
    this.formService.goToNextWindow();
    this.readData();
  }

  public prevFormWindow(): void {
    this.formService.goToPrevWindow();
    this.readData();
  }

  public showNextButton(windowName: string): boolean {
    if (
      windowName === 'CONTACT' ||
      windowName === 'CUSTOM' ||
      windowName === 'NOTE' ||
      windowName === 'DATE' ||
      windowName === 'DURATION' ||
      windowName === 'VOUCHER') {
      return true;
    }
    return false;
  }

  selectService(service: ServiceMax): void {
    this.formService.calendarEvent.service = service;
    this.formService.calendarEvent.type = service.type;
    this.formService.calendarEvent.id = null;
    this.formService.calendarEvent.remainingCapacity = -1;
    this.formService.calendarEvent.requestedAttendeesNo = 1;
    this.nextFormWindow();
  }

  public showBackButton(windowName: string): boolean {
    if (windowName === 'CONTACT' ||
      windowName === 'CUSTOM' ||
      windowName === 'NOTE' ||
      windowName === 'SUMMARY' ||
      windowName === 'DURATION' ||
      windowName === 'VOUCHER') {
      return true;
    }

    if (windowName === 'BUSINESS_BRANCH') {
      return false;
    }

    if (windowName === 'SERVICE_GROUP') {
      const businessBranch: ReservationWindow = TemplateUtil.getWindow(FormWindowName.BUSINESS_BRANCH, this.formService.template);
      if (businessBranch && businessBranch.active) {
        return true;
      }
      return false;
    }

    if (windowName === 'SERVICE') {
      const serviceGroup: ReservationWindow = TemplateUtil.getWindow(FormWindowName.SERVICE_GROUP, this.formService.template);
      if (serviceGroup && serviceGroup.active && !this.formService.hideBackButtonForService) {
        return true;
      }
      const businessBranch: ReservationWindow = TemplateUtil.getWindow(FormWindowName.BUSINESS_BRANCH, this.formService.template);
      if (businessBranch && businessBranch.active && !this.formService.hideBackButtonForService) {
        return true;
      }
      return false;
    }
    if (windowName === 'DATE') {
      const service: ReservationWindow = TemplateUtil.getWindow(FormWindowName.SERVICE, this.formService.template);
      if (service && service.active && !this.formService.hideBackButtonForDate) {
        // TODO check also serviceGroup
        return true;
      }
      return false;
    }
    return false;
  }

  private readData(counter ?: number): void {
    if (!this.formService.template) {
      // TODO this happens for the first window of reservation form, because template it not loaded,
      // for now its ok, as first windows done have special config
      this.config = new ReservationWindowConfig();
      return;
    }

    this.config = this.formService.template.windows[this.formService.idx].config;
    if (!this.config) {
      this.config = new ReservationWindowConfig();
    }
  }

}
