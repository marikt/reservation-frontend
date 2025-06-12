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
import {NgForOf} from '@angular/common';
import {FormBusinessBranchItemWindowComponent} from '../form-business-branch-item-window/form-business-branch-item-window.component';

@Component({
  selector: 'app-form-business-branch-window',
  templateUrl: './form-business-branch-window.component.html',
  styleUrls: ['./form-business-branch-window.component.scss'],
  imports: [
    NgForOf,
    FormBusinessBranchItemWindowComponent
  ],
  standalone: true
})
export class FormBusinessBranchWindowComponent extends MyForm implements OnInit {

  public businessBranchActive: boolean = false;
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
    const businessBranch: ReservationWindow = TemplateUtil.getWindow(FormWindowName.BUSINESS_BRANCH, this.formService.template);
    if (!businessBranch) {
      return;
    }
    if (
      businessBranch.active &&
      (this.formService.business.businessBranches &&
        this.formService.business.businessBranches.length > 0)) {
      this.formService.formWindows.push(this);
    }
  }


  public validate(): boolean {
    if (this.formService.calendarEvent.businessBranch) {
      return true
    }
    return false;
  }

  private evaluateServiceSize() {
    for (const businessBranch of this.formService.getBusinessBranches()) {
      if (businessBranch.name.length > 30) {
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
