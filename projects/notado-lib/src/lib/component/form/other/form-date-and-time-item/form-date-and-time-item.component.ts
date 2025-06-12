import {Component, OnInit} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {NgForOf, NgIf} from '@angular/common';
import {DateToStringPipe} from '../../../../pipe/date-to-string.pipe';
import {TimeToStringPipe} from '../../../../pipe/time-to-string.pipe';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-form-date-and-time-item',
  templateUrl: './form-date-and-time-item.component.html',
  styleUrls: ['./form-date-and-time-item.component.scss'],
  imports: [
    NgForOf,
    DateToStringPipe,
    NgIf,
    TimeToStringPipe,
    TranslateModule
  ],
  standalone: true
})
export class FormDateAndTimeItemComponent implements OnInit {

  constructor(
    public formService: FormService,
  ) {

  }

  public ngOnInit() {
  }

  public removeDateAndTime(idx: number): void {
    this.formService.calendarEvent.dateAndTimeAndIds.splice(idx, 1);
    if (this.formService.calendarEvent.dateAndTimeAndIds.length === 0) {
      this.formService.calendarEvent.startTime = null;
      this.formService.calendarEvent.timeMinutes = null;
    }
  }
}
