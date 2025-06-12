import {Component, Input, OnInit} from '@angular/core';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {DemoService} from '../../../../service/demo.service';
import {MySubscribable} from '../../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {Event} from '../../../../../../projects/notado-lib/src/lib/util/event.enum';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-demo-form-time',
  templateUrl: './demo-form-time.component.html',
  styleUrls: ['./demo-form-time.component.scss', '../demo.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    NgForOf
  ],
  standalone: true
})
export class DemoFormTimeComponent extends MySubscribable implements OnInit {


    @Input('label') public label: string;
    @Input('times') public times: string[];

    public model: any;
    public selectedTime: string;

    constructor(
        public broadcastService: BroadcastService,
        public demoService: DemoService,
    ) {
        super(broadcastService);
        this.subscribe(Event.DEMO_RESERVATION_TIME_SELECTED, (time) => {
            this.selectedTime = time;
            this.demoService.reservation.time = time;
        });

    }

    public ngOnInit() {
    }

    public setCalendarEventTime(time: string) {
        this.fire(Event.DEMO_RESERVATION_TIME_SELECTED, time);
    }
}
