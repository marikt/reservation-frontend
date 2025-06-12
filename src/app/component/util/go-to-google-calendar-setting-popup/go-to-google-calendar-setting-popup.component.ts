import {Component, Input} from '@angular/core';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-go-to-google-calendar-setting-popup',
  standalone: true,
  imports: [TranslateModule, NgIf],
  templateUrl: './go-to-google-calendar-setting-popup.component.html',
  styleUrl: './go-to-google-calendar-setting-popup.component.scss'
})
export class GoToGoogleCalendarSettingPopupComponent {

  @Input('calendar')
  public calendar: Calendar;

  @Input('buttonLabel')
  public buttonLabel: string;

  @Input('buttonStyle')
  public buttonStyle: string;

  constructor(public translate: TranslateService,
              public modalService: ModalService,
  ) {
  }

  public get calendarSettingsUrl(): string {
    const baseUrl = 'https://calendar.google.com/calendar/u/0/r/settings/calendar/';
    const base64Id = btoa(this.calendar.id);
    return baseUrl + base64Id;
  }
}
