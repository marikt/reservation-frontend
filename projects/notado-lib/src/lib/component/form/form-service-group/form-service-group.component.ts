import {Component} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {FormServiceGroupWindowComponent} from '../../form-window/form-service-group-window/form-service-group-window.component';
import {NgIf} from '@angular/common';
import {FormTemplateSimpleComponent} from '../../form-type/simple/form-template-simple/form-template-simple.component';
import {FormTemplateWidgetComponent} from '../../form-type/widget/form-template-widget/form-template-widget.component';

@Component({
  selector: 'app-form-service-group',
  templateUrl: './form-service-group.component.html',
  styleUrls: ['./form-service-group.component.scss'],
  imports: [
    FormTemplateFullscreenComponent,
    FormServiceGroupWindowComponent,
    NgIf,
    FormTemplateSimpleComponent,
    FormTemplateWidgetComponent
  ],
  standalone: true
})
export class FormServiceGroupComponent extends FormMobileDetector {

  constructor(public formService: FormService) {
    super(formService);
  }

}
