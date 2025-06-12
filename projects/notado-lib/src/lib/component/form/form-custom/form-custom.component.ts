import {Component} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {NgIf} from '@angular/common';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {FormCustomWindowComponent} from '../../form-window/form-custom-window/form-custom-window.component';
import {FormTemplateSimpleComponent} from '../../form-type/simple/form-template-simple/form-template-simple.component';
import {FormTemplateWidgetComponent} from '../../form-type/widget/form-template-widget/form-template-widget.component';

@Component({
  selector: 'app-form-custom',
  templateUrl: './form-custom.component.html',
  styleUrls: ['./form-custom.component.scss'],
  imports: [
    NgIf,
    FormTemplateFullscreenComponent,
    FormCustomWindowComponent,
    FormTemplateSimpleComponent,
    FormTemplateWidgetComponent
  ],
  standalone: true
})
export class FormCustomComponent  extends FormMobileDetector {

  constructor(public formService: FormService) {
    super(formService)
  }


}
