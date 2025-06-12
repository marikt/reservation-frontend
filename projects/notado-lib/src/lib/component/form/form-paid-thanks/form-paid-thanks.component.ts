import {Component} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {NgIf} from '@angular/common';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {FormPaidThanksWindowComponent} from '../../form-window/form-paid-thanks-window/form-paid-thanks-window.component';
import {FormTemplateSimpleComponent} from '../../form-type/simple/form-template-simple/form-template-simple.component';
import {FormTemplateWidgetComponent} from '../../form-type/widget/form-template-widget/form-template-widget.component';

@Component({
  selector: 'app-form-paid-thanks',
  templateUrl: './form-paid-thanks.component.html',
  styleUrls: ['./form-paid-thanks.component.scss'],
  imports: [
    NgIf,
    FormTemplateFullscreenComponent,
    FormPaidThanksWindowComponent,
    FormTemplateSimpleComponent,
    FormTemplateWidgetComponent
  ],
  standalone: true
})
export class FormPaidThanksComponent extends FormMobileDetector {

  constructor(public formService: FormService) {
    super(formService)
  }


}
