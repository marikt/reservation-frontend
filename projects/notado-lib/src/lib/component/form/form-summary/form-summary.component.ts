import {Component} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {NgIf} from '@angular/common';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {FormSummaryWindowComponent} from '../../form-window/form-summary-window/form-summary-window.component';
import {FormTemplateSimpleComponent} from '../../form-type/simple/form-template-simple/form-template-simple.component';
import {FormTemplateWidgetComponent} from '../../form-type/widget/form-template-widget/form-template-widget.component';

@Component({
  selector: 'app-form-summary',
  templateUrl: './form-summary.component.html',
  styleUrls: ['./form-summary.component.scss'],
  imports: [
    NgIf,
    FormTemplateFullscreenComponent,
    FormSummaryWindowComponent,
    FormTemplateSimpleComponent,
    FormTemplateWidgetComponent
  ],
  standalone: true
})
export class FormSummaryComponent extends FormMobileDetector {

  constructor(public formService: FormService) {
    super(formService)
  }


}
