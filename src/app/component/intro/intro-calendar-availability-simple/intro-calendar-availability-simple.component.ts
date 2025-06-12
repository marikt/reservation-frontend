import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {IntroItemComponent} from '../intro-item/intro-item.component';

@Component({
  selector: 'app-intro-calendar-availability-simple',
  templateUrl: './intro-calendar-availability-simple.component.html',
  styleUrls: ['./intro-calendar-availability-simple.component.scss'],
  imports: [
    IntroItemComponent
  ],
  standalone: true
})
export class IntroCalendarAvailabilitySimpleComponent implements OnInit {

  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {
  }

}
