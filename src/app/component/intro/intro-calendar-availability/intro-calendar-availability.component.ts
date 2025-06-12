import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-intro-calendar-availability',
  templateUrl: './intro-calendar-availability.component.html',
  styleUrls: ['./intro-calendar-availability.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class IntroCalendarAvailabilityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
