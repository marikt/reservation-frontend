import {Component} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {NgIf} from '@angular/common';
import {FormBusinessBranchWindowComponent} from '../../form-window/form-business-branch/form-business-branch-window.component';
import {FormTemplateSimpleComponent} from '../../form-type/simple/form-template-simple/form-template-simple.component';
import {FormTemplateWidgetComponent} from '../../form-type/widget/form-template-widget/form-template-widget.component';

@Component({
  selector: 'app-form-business-branch',
  templateUrl: './form-business-branch.component.html',
  styleUrls: ['./form-business-branch.component.scss'],
  imports: [
    FormTemplateFullscreenComponent,
    NgIf,
    FormBusinessBranchWindowComponent,
    FormTemplateSimpleComponent,
    FormTemplateWidgetComponent
  ],
  standalone: true
})
export class FormBusinessBranchComponent extends FormMobileDetector {

  constructor(public formService: FormService) {
    super(formService);
  }

}
