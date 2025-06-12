import {Directive, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {BroadcastService} from '../service/broadcast.service';
import {Event} from './event.enum';

@Directive()
export class MySubscribable implements OnDestroy {

  private subscription: Subscription[] = [];

  constructor(
    public broadcastService: BroadcastService
  ) {
  }

  public subscribe(event: Event, callback: (data?: any) => void): void {
    let sub: Subscription = this.broadcastService.subject(event).subscribe((data) => callback(data));
    this.subscription.push(sub);
  }

  public fire(event: Event, data?: any) {
    this.broadcastService.next(event, data);
  }

  ngOnDestroy() {
    for (let sub of this.subscription) {
      sub.unsubscribe();
    }
  }

}

