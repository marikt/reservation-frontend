import {Component, HostListener, OnInit} from '@angular/core';
import {WizardService} from '../../../service/wizard.service';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-business-wizard-start',
  templateUrl: './business-wizard-start.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    TranslateModule
  ],
  standalone: true
})
export class BusinessWizardStartComponent implements OnInit {

  public isMobile: boolean;

  constructor(public wizardService: WizardService) {
    this.wizardService.currentRoute = 'wizard/business-wizard-start';

  }

  public ngOnInit(): void {
    this.onResize();
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
