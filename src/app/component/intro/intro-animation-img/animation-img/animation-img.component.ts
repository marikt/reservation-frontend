import {Component, OnInit} from '@angular/core';
import {bounceInOnEnterAnimation, bounceInUpOnEnterAnimation, bounceOutOnLeaveAnimation} from 'angular-animations';
import {IntroAnimationEvent} from '../../../../model/intro-animation-event';
import {AnimationReservationEventComponent} from '../animation-reservation-event/animation-reservation-event.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-animation-img',
  templateUrl: './animation-img.component.html',
  styleUrls: ['./animation-img.component.scss'],
  animations: [
    bounceInOnEnterAnimation(),
    bounceInUpOnEnterAnimation(),
    bounceOutOnLeaveAnimation()
  ],
  imports: [
    AnimationReservationEventComponent,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class AnimationImgComponent implements OnInit {

  public state = true;
  public idx: number[] = [1, 2, 2, 1, 0, 3, 4, 4, 3, 0];
  public events: IntroAnimationEvent[] = [];

  constructor() {
  }

  ngOnInit(): void {
    const eventA: IntroAnimationEvent = new IntroAnimationEvent('MASSAGE', 'rgb(142, 218, 237)', '01.png', 50, 10);
    const eventB: IntroAnimationEvent = new IntroAnimationEvent('SICKDAY', 'rgb(254, 179, 132)', '02.png', 70, 16);
    const eventC: IntroAnimationEvent = new IntroAnimationEvent('HAIRCUT', '#9fe6a0', '03.png', 90, 25);
    const eventD: IntroAnimationEvent = new IntroAnimationEvent('DENTIST', 'rgb(254, 179, 132)', '04.png', 50, 10);
    const eventE: IntroAnimationEvent = new IntroAnimationEvent('VACATION', '#9fe6a0', '05.png', 120, 50);

    this.events.push(eventA);
    this.events.push(eventB);
    this.events.push(eventC);
    this.events.push(eventD);
    this.events.push(eventE);

    const event = this.events[0];
    event.show = !event.show;

    let i: number = 0;
    setInterval(() => {
        let event = this.events[this.idx[i % this.idx.length]];
        event.show = !event.show;
        i ++;
      },
      1500);
  }

}
