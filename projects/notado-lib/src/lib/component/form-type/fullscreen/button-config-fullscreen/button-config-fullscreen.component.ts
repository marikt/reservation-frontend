import {Component, Input} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {HttpService} from '../../../../service/http.service';
import {SpinnerService} from '../../../../service/spinner.service';
import {ButtonConfig} from '../../util/button-config';
import {CONST} from '../../../../util/const';
import {LocalStorageService} from '../../../../service/local-storage.service';
import {NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-button-config-fullscreen',
  templateUrl: './button-config-fullscreen.component.html',
  styleUrls: ['./button-config-fullscreen.component.scss'],
  imports: [
    NgIf,
    TranslateModule
  ],
  standalone: true
})
export class ButtonConfigFullscreenComponent extends ButtonConfig {

  @Input('formEditMode')
  public formEditMode: boolean = false;
  public owner: boolean = false;

  constructor(public formService: FormService,
              public http: HttpService,
              public localStorage: LocalStorageService,
              public spinnerService: SpinnerService
  ) {
    super(formService, http, spinnerService);
    this.owner = this.localStorage.get(CONST.OWNER);
  }

  public doNothing() {
  }
}
