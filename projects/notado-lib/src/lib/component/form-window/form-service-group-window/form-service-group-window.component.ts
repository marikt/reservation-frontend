import {Component, HostListener, OnInit} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {Server} from '../../../../config/server';
import {ServiceSize} from '../../../util/service-size';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {ReservationWindow} from '../../../model/reservation-form/reservation-window';
import {TemplateUtil} from '../../../util/template-util';
import {FormWindowName} from '../../../util/form-window-name';
import {Router} from '@angular/router';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormServiceGroupItemWindowComponent} from '../form-service-group-item-window/form-service-group-item-window.component';

@Component({
  selector: 'app-form-service-group-window',
  templateUrl: './form-service-group-window.component.html',
  styleUrls: ['./form-service-group-window.component.scss'],
  imports: [
    NgForOf,
    FormServiceGroupItemWindowComponent,
    NgIf
  ],
  standalone: true
})
export class FormServiceGroupWindowComponent extends MyForm implements OnInit {

  public serviceGroupActive: boolean = false;
  public serviceSize: ServiceSize = ServiceSize.SMALL;
  public isBigService: boolean;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public server: Server,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
    public router: Router,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
    this.evaluateServiceSize();
    this.onResize();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public addThisWindowForValidation(): void {
    const serviceGroup: ReservationWindow = TemplateUtil.getWindow(FormWindowName.SERVICE_GROUP, this.formService.template);
    if (!serviceGroup) {
      return;
    }
    if (
      serviceGroup.active &&
      (this.formService.business.serviceGroups &&
        this.formService.business.serviceGroups.length > 0)) {
      this.formService.formWindows.push(this);
    }
  }


  public validate(): boolean {
    if (this.formService.calendarEvent.serviceGroup) {
      return true;
    }
    return false;
  }

  private evaluateServiceSize() {
    for (let serviceGroup of this.formService.getServiceGroups()) {
      if (serviceGroup.name.length > 30) {
        this.isBigService = true;
        return;
      }
    }
    this.isBigService = false;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (this.formService.isMobile) {
      this.serviceSize = ServiceSize.MOBILE;
    } else if (this.isBigService) {
      this.serviceSize = ServiceSize.BIG;
    } else {
      this.serviceSize = ServiceSize.SMALL;
    }
  }

  public get serviceSizeEnum(): typeof ServiceSize {
    return ServiceSize;
  }

}
