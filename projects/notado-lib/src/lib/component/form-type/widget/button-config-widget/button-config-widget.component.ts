import {Component} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {HttpService} from '../../../../service/http.service';
import {SpinnerService} from '../../../../service/spinner.service';
import {ButtonConfig} from '../../util/button-config';
import {CONST} from '../../../../util/const';
import {LocalStorageService} from '../../../../service/local-storage.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-button-config-widget',
  templateUrl: './button-config-widget.component.html',
  styleUrls: ['./button-config-widget.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class ButtonConfigWidgetComponent extends ButtonConfig {
  public owner: boolean = false;

  constructor(public formService: FormService,
              public http: HttpService,
              public localStorage: LocalStorageService,
              public spinnerService: SpinnerService
  ) {
    super(formService, http, spinnerService);
    this.owner = this.localStorage.get(CONST.OWNER);
  }



}
