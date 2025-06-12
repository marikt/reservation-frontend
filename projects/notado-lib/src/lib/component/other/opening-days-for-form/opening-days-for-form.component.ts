import {Component, Input, OnInit} from '@angular/core';
import {OpeningDay} from '../../../model/opening-day';
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {MinutesToTimePipe} from '../../../pipe/minutes-to-time.pipe';
import {TimeToStringPipe} from '../../../pipe/time-to-string.pipe';
import {FormService} from '../../../service/form.service';

@Component({
  selector: 'app-opening-days-for-form',
  templateUrl: './opening-days-for-form.component.html',
  styleUrls: ['./opening-days-for-form.component.scss'],
  imports: [
    TranslateModule,
    NgForOf,
    NgIf,
    MinutesToTimePipe,
    TimeToStringPipe,
    NgStyle
  ],
  standalone: true
})
export class OpeningDaysForFormComponent implements OnInit {

  @Input() openingDays: OpeningDay[];

  constructor(public formService: FormService
  ) {
  }

  ngOnInit() {
  }

}
