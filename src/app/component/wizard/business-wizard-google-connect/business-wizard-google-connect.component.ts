import {Component} from '@angular/core';
import {WizardService} from '../../../service/wizard.service';
import {
  GoogleConnectPopupInfoComponent,
  GoogleConnectType
} from '../../dashboard/google-calendar-connect-business-item/google-connect-popup-info/google-connect-popup-info.component';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {Event} from '../../../../../projects/notado-lib/src/lib/util/event.enum';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {BusinessWizardRootComponent} from '../business-wizard-root.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-business-wizard-google-connect',
  templateUrl: './business-wizard-google-connect.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    TranslateModule,
    GoogleConnectPopupInfoComponent
  ],
  standalone: true
})
export class BusinessWizardGoogleConnectComponent extends BusinessWizardRootComponent {

  constructor(public wizardService: WizardService,
              public modalService: ModalService,
              public route: ActivatedRoute,
              public alertService: AlertService,
              public http: HttpService,
              public userService: UserService,
              public router: Router,
              public broadcastService: BroadcastService) {
    super(alertService, broadcastService, http, route, router);
  }


  public get googleConnectType(): typeof GoogleConnectType {
    return GoogleConnectType;
  }

}
