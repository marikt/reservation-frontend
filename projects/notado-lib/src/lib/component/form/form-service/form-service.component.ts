import {Component, Input, OnInit} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {NgIf} from '@angular/common';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {FormServiceWindowComponent} from '../../form-window/form-service-window/form-service-window.component';
import {FormTemplateSimpleComponent} from '../../form-type/simple/form-template-simple/form-template-simple.component';
import {FormTemplateWidgetComponent} from '../../form-type/widget/form-template-widget/form-template-widget.component';

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.scss'],
  imports: [
    NgIf,
    FormTemplateFullscreenComponent,
    FormServiceWindowComponent,
    FormTemplateSimpleComponent,
    FormTemplateWidgetComponent
  ],
  standalone: true
})
export class FormServiceComponent extends FormMobileDetector implements OnInit {

  @Input('formEditMode')
  public formEditMode: boolean = false;

  constructor(public formService: FormService) {
    super(formService)
  }

  ngOnInit(): void {
  }

}
