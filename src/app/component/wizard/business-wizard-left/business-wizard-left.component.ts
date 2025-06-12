import {Component, HostListener, Input, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {WizardService} from '../../../service/wizard.service';
import {NavbarService} from '../../../service/navbar.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-business-wizard-left',
  templateUrl: './business-wizard-left.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class BusinessWizardLeftComponent implements OnInit {

  @Input()
  public label: string;

  @Input()
  public serviceName: string = '';

  @Input()
  public workerName: string = '';

  public labelTranslated: string;
  public labelZero: string = '';
  public isMobile: boolean;

  constructor(
    private translateService: TranslateService,
    public wizardService: WizardService,
    public navbarService: NavbarService,
    private http: HttpService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.onResize();
    this.labelTranslated = this.translateService.instant(this.label);
    if (this.serviceName) {
      this.labelTranslated = this.labelTranslated + ' ' + this.serviceName;
    }
    if (this.workerName) {
      this.labelTranslated = this.labelTranslated + ' ' + this.workerName;
    }
  }

  public skipWizard(): void {
    // this.http.put(Api.BUSINESS + '/' + this.wizardService.business.id, this.wizardService.business, () => {
    this.wizardService.hideWizardForNextTime();
    this.router.navigate(['dashboard/dashboard-landing']);
    // });
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

}
