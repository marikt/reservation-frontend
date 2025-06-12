import {Component} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {NgIf} from '@angular/common';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {FormPaidErrorWindowComponent} from '../../form-window/form-paid-error-window/form-paid-error-window.component';

@Component({
  selector: 'app-form-paid-error',
  templateUrl: './form-paid-error.component.html',
  styleUrls: ['./form-paid-error.component.scss'],
  imports: [
    NgIf,
    FormTemplateFullscreenComponent,
    FormPaidErrorWindowComponent
  ],
  standalone: true
})
export class FormPaidErrorComponent  extends FormMobileDetector {

  constructor(public formService: FormService) {
    super(formService)
  }


}
