import {Component, Input} from '@angular/core';
import {FormService} from '../../../../service/form.service';

@Component({
    selector: 'app-form-footer-widget',
    templateUrl: './form-footer-widget.component.html',
    styleUrls: ['./form-footer-widget.component.scss'],
    standalone: true
})
export class FormFooterWidgetComponent {


  @Input('formEditMode')
  public formEditMode: boolean;

  constructor(public formService: FormService
  ) {
  }

}
