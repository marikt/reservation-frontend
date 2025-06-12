import {Component, HostListener, OnInit} from '@angular/core';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-business-wizard-fin',
  templateUrl: './business-wizard-fin.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    TranslateModule,
    RouterLink
  ],
  standalone: true
})
export class BusinessWizardFinComponent implements OnInit {

  public isMobile: boolean;

  constructor() {
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
