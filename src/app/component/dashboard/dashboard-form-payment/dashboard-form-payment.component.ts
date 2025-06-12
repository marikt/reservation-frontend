import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../service/dashboard.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {StripeIntegrationService} from '../../../service/stripe-integration-service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgIf} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VideoGuideComponent} from '../../video-guide/video-guide.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';


@Component({
  selector: 'app-dashboard-form-payment',
  templateUrl: './dashboard-form-payment.component.html',
  styleUrls: ['./dashboard-form-payment.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    NgIf,
    DashboardCardComponent,
    TranslateModule,
    NgbPopover,
    FormsModule,
    ReactiveFormsModule,
    VideoGuideComponent
  ],
  standalone: true
})
export class DashboardFormPaymentComponent implements OnInit {
  
  public secretKeyForm: FormGroup;
  public showSecretKey: boolean = false;
  public isSubmitting: boolean = false;
  public isEditingSecretKey: boolean = false;

  constructor(
    public http: HttpService,
    public dashboardService: DashboardService,
    public languageService: LanguageService,
    public modalService: ModalService,
    public stripeIntegrationService: StripeIntegrationService,
    public preventDoubleClickService: PreventDoubleClickService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.secretKeyForm = this.formBuilder.group({
      privateKey: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.stripeIntegrationService.init();
  }

  /**
   * Toggle between display and edit mode for the secret key
   */
  public toggleSecretKeyEdit(): void {
    this.isEditingSecretKey = true;
    this.secretKeyForm.reset();
    this.showSecretKey = false;
  }

  /**
   * Cancel editing the secret key and return to display mode
   */
  public cancelSecretKeyEdit(): void {
    this.isEditingSecretKey = false;
    this.secretKeyForm.reset();
  }

  /**
   * Toggle visibility of the secret key in the input field
   */
  public toggleSecretKeyVisibility(): void {
    this.showSecretKey = !this.showSecretKey;
  }

  /**
   * Save the new secret key
   */
  public savePrivateKey(): void {
    if (this.secretKeyForm.invalid) {
      this.secretKeyForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.preventDoubleClickService.preventFor();
    
    const secretKey = this.secretKeyForm.get('privateKey').value;
    
    this.http.put(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id + '/update-stripe-private-key',
      {value: secretKey},
      () => {
        this.stripeIntegrationService.loadIntegrationConfig(() => {
          this.isEditingSecretKey = false;
          this.alertService.addSuccess('Secret key updated successfully');
          this.isSubmitting = false;
        });
      },
      (error) => {
        this.alertService.addError('Failed to update secret key');
        this.isSubmitting = false;
      });
  }
}
