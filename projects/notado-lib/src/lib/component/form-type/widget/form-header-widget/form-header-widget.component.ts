import {Component} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {HttpService} from '../../../../service/http.service';
import {SpinnerService} from '../../../../service/spinner.service';
import {ButtonConfig} from '../../util/button-config';
import {FormWindowName} from '../../../../util/form-window-name';
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {DaysHoursMinutesPipe} from '../../../../pipe/hours-minutes.pipe';
import {TimeToStringPipe} from '../../../../pipe/time-to-string.pipe';
import {DurationToStringPipe} from '../../../../pipe/duration-to-string.pipe';
import {DateToStringPipe} from '../../../../pipe/date-to-string.pipe';

@Component({
  selector: 'app-form-header-widget',
  templateUrl: './form-header-widget.component.html',
  styleUrls: ['./form-header-widget.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    DaysHoursMinutesPipe,
    TimeToStringPipe,
    DurationToStringPipe,
    DateToStringPipe,
    NgForOf
  ],
  standalone: true
})
export class FormHeaderWidgetComponent extends ButtonConfig {

  public reservationInfoShow: boolean = false;

  constructor(public formService: FormService,
              public http: HttpService,
              public spinnerService: SpinnerService
  ) {
    super(formService, http, spinnerService);
  }

  ngOnInit() {
    this.reservationInfoShow = false;
  }

  public showServiceLabel(cardWindow: string) {
    if (
      cardWindow === 'CONTACT' ||
      cardWindow === 'CUSTOM' ||
      cardWindow === 'NOTE' ||
      cardWindow === 'DATE' ||
      cardWindow === 'VOUCHER') {
      return true;
    }
    return false;
  }

  public getIdx(formWindowName: FormWindowName): number {
    if (!this.formService.template) {
      return 10_000;
    }
    for (let i = 0; i < this.formService.template.windows.length; i++) {
      if (this.formService.template.windows[i].name === formWindowName) {
        return i;
      }
    }
  }

  public get formWindowName(): typeof FormWindowName {
    return FormWindowName;
  }

}
