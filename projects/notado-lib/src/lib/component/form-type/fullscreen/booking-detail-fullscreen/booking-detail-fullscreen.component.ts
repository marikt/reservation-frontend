import {Component, Input} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {FormWindowName} from '../../../../util/form-window-name';
import {Server} from '../../../../../config/server';
import {TranslateModule} from '@ngx-translate/core';
import {JsonPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {DurationToStringPipe} from '../../../../pipe/duration-to-string.pipe';
import {DateToStringPipe} from '../../../../pipe/date-to-string.pipe';
import {TimeToStringPipe} from '../../../../pipe/time-to-string.pipe';
import {SafeUrlForFormPipe} from '../../../../pipe/safe-url-for-form.pipe';
import {OpeningDaysForFormComponent} from '../../../other/opening-days-for-form/opening-days-for-form.component';

@Component({
  selector: 'app-booking-detail-fullscreen',
  templateUrl: './booking-detail-fullscreen.component.html',
  styleUrls: ['./booking-detail-fullscreen.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    DurationToStringPipe,
    DateToStringPipe,
    NgForOf,
    TimeToStringPipe,
    SafeUrlForFormPipe,
    JsonPipe,
    NgStyle,
    OpeningDaysForFormComponent
  ],
  standalone: true
})
export class BookingDetailFullscreenComponent {

  @Input('formEditMode')
  public formEditMode: boolean = false;

  constructor(public formService: FormService,
              public server: Server,
  ) {
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
    return -1;
  }

  public get formWindowName(): typeof FormWindowName {
    return FormWindowName;
  }

  public getLocation(): string {
    if (
      (this.formService.calendarEvent.businessBranch == null ||
        this.formService.calendarEvent.businessBranch.location == null) &&
      this.formService.calendarEvent.service.location == null &&
      this.formService.business.location == null) {
      return '';
    }

    if (this.formService.calendarEvent.service.location) {
      return this.formService.calendarEvent.service.location;
    }

    if (this.formService.calendarEvent.businessBranch &&
      this.formService.calendarEvent.businessBranch.location
    ) {
      return this.formService.calendarEvent.businessBranch.location;
    }

    return this.formService.business.location
  }
}
