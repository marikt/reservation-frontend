import {Component} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {ActivatedRoute, Router} from '@angular/router';
import {WizardService} from '../../../service/wizard.service';
import {OpeningDay} from '../../../../../projects/notado-lib/src/lib/model/opening-day';
import {BusinessWizardRootComponent} from '../business-wizard-root.component';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {NgIf} from '@angular/common';
import {OpeningItemWizardComponent} from '../../util/opening-item-wizard/opening-item-wizard.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-business-wizard-opening',
  templateUrl: './business-wizard-opening.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    NgIf,
    OpeningItemWizardComponent,
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class BusinessWizardOpeningComponent extends BusinessWizardRootComponent {

  public openingDays: OpeningDay[];

  constructor(
    public broadcastService: BroadcastService,
    public wizardService: WizardService,
    public http: HttpService,
    public router: Router,
    public alertService: AlertService,
    public route: ActivatedRoute) {
    super(alertService, broadcastService, http, route, router);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.http.get(Api.OPENING_DAY + '/for-business/' + this.wizardService.business.id,
      (openingDays: OpeningDay[]) => {
        this.openingDays = openingDays;
      });

  }

  public goToNextScreen() {
    this.http.put(Api.OPENING_DAY + '/for-business/' + this.wizardService.business.id, this.openingDays);
    this.wizardService.next('business-wizard-service-name/0');
  }

}
