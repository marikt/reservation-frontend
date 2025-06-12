import {Component, OnInit} from '@angular/core';
import {FormMobileDetector} from '../other/form-mobile-detector';
import {FormService} from '../../../service/form.service';
import {FormTemplateFullscreenComponent} from '../../form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {NgIf} from '@angular/common';
import {FormContactWindowComponent} from '../../form-window/form-contact-window/form-contact-window.component';
import {FormTemplateSimpleComponent} from '../../form-type/simple/form-template-simple/form-template-simple.component';
import {FormTemplateWidgetComponent} from '../../form-type/widget/form-template-widget/form-template-widget.component';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss'],
  imports: [
    FormTemplateFullscreenComponent,
    NgIf,
    FormContactWindowComponent,
    FormTemplateSimpleComponent,
    FormTemplateWidgetComponent
  ],
  standalone: true
})
export class FormContactComponent extends FormMobileDetector implements OnInit {

  constructor(public formService: FormService) {
    super(formService)
  }

  ngOnInit(): void {
  }

}
