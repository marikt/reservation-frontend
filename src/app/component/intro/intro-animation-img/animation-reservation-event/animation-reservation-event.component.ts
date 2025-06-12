import {Component, Input, OnInit} from '@angular/core';
import {IntroAnimationEvent} from '../../../../model/intro-animation-event';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-animation-reservation-event',
  templateUrl: './animation-reservation-event.component.html',
  styleUrls: ['./animation-reservation-event.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class AnimationReservationEventComponent implements OnInit {

  @Input('introAnimationEvent')
  public introAnimationEvent: IntroAnimationEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
