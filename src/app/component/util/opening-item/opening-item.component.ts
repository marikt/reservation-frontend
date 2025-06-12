import {Component, Input, OnInit} from '@angular/core';
import {OpeningDay, OpeningDayRange} from '../../../../../projects/notado-lib/src/lib/model/opening-day';
import {Time} from '../../../../../projects/notado-lib/src/lib/model/time';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../../../projects/notado-lib/src/lib/util/event.enum';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-opening-item',
  templateUrl: './opening-item.component.html',
  styleUrls: ['./opening-item.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class OpeningItemComponent extends MySubscribable implements OnInit {

  @Input('openingDay') public openingDay: OpeningDay;
  @Input('labelDay') public labelDay: string;
  @Input('closeLabel') public closeLabel: string = 'COMMON.CLOSE';
  @Input('uniqueId') public uniqueId: string;

  public froms: string[] = [];
  public tills: string[] = [];

  constructor(public broadcastService: BroadcastService,
  ) {
    super(broadcastService);
  }

  public ngOnInit() {
    const openingDayRanges: OpeningDayRange[] = this.openingDay.openingDayRanges;
    if (!openingDayRanges) {
      return;
    }
    this.froms = [];
    this.tills = [];
    for (let i = 0; i < openingDayRanges.length; i++) {
      const from = Time.toString(openingDayRanges[i].from);
      const till = Time.toString(openingDayRanges[i].till);
      this.froms.push(from);
      this.tills.push(till);
    }
  }

  public addNewOpeningDayRange(): void {
    let openingDayRanges: OpeningDayRange[] = this.openingDay.openingDayRanges;
    if (!openingDayRanges) {
      openingDayRanges = [];
    }

    const openingDayRange: OpeningDayRange = new OpeningDayRange();
    openingDayRange.from = new Time(8, 0);
    openingDayRange.till = new Time(18, 0);
    openingDayRanges.push(openingDayRange);
    this.froms.push('08:00');
    this.tills.push('18:00');
  }

  public removeOpeningDayRange(idx: number) {
    const openingDayRanges: OpeningDayRange[] = this.openingDay.openingDayRanges;
    if (!openingDayRanges) {
      return;
    }

    openingDayRanges.splice(idx, 1);
    this.froms.splice(idx, 1);
    this.tills.splice(idx, 1);
  }

  public setFromFromString(time: string, idx: number): void {
    this.froms[idx] = time;
    this.openingDay.openingDayRanges[idx].from = Time.fromString(time)
  }

  public setTillFromString(time: string, idx: number): void {
    this.tills[idx] = time;
    this.openingDay.openingDayRanges[idx].till = Time.fromString(time)
  }

  public closeOpen($event: Event) {
    this.openingDay.close = !this.openingDay.close;

    if (this.openingDay.close) {
      this.openingDay.openingDayRanges = [];
    } else {
      const openingDayRange: OpeningDayRange = new OpeningDayRange();
      openingDayRange.from = new Time(8, 0);
      openingDayRange.till = new Time(18, 0);
      this.openingDay.openingDayRanges.push(openingDayRange);
      this.froms.push('08:00');
      this.tills.push('18:00');
    }
  }
}
