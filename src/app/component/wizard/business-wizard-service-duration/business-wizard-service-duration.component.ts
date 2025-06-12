import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeaheadService} from '../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {WizardService} from '../../../service/wizard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {MetaService} from '../../../service/meta.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {Service} from '../../../../../projects/notado-lib/src/lib/model/service';
import {BusinessWizardRootComponent} from '../business-wizard-root.component';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-business-wizard-service-duration',
  templateUrl: './business-wizard-service-duration.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    NgIf,
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class BusinessWizardServiceDurationComponent extends BusinessWizardRootComponent {

  @ViewChild('hoursCmp') hoursCmp: NgbTypeahead;

  constructor(
    public wizardService: WizardService,
    public route: ActivatedRoute,
    public typeaheadService: TypeaheadService,
    public router: Router,
    public http: HttpService,
    public metaService: MetaService,
    public alertService: AlertService,
    public broadcastService: BroadcastService) {
    super(alertService, broadcastService, http, route, router);
  }

  public ngOnInit() {
    super.ngOnInit();

  }

  public onSubmit() {
    const service: Service = this.wizardService.services[this.idx];
    this.http.put(Api.SERVICE + '/' + service.id, service, () => {
      this.wizardService.next('business-wizard-service-img/' + this.idx);
    })
  }


}
