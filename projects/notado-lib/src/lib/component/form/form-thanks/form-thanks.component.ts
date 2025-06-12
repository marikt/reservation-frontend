import {Component} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {NgIf} from '@angular/common';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {FormThanksWindowComponent} from '../../form-window/form-thanks-window/form-thanks-window.component';
import {FormTemplateSimpleComponent} from '../../form-type/simple/form-template-simple/form-template-simple.component';
import {FormTemplateWidgetComponent} from '../../form-type/widget/form-template-widget/form-template-widget.component';

@Component({
  selector: 'app-form-thanks',
  templateUrl: './form-thanks.component.html',
  styleUrls: ['./form-thanks.component.scss'],
  imports: [
    NgIf,
    FormTemplateFullscreenComponent,
    FormThanksWindowComponent,
    FormTemplateSimpleComponent,
    FormTemplateWidgetComponent
  ],
  standalone: true
})
export class FormThanksComponent extends FormMobileDetector {

  constructor(public formService: FormService) {
    super(formService)
  }


}
