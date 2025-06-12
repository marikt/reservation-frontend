import {Component, Input, OnInit} from '@angular/core';
import {MySubscribable} from '../../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {DemoService} from '../../../../service/demo.service';
import {Event} from '../../../../../../projects/notado-lib/src/lib/util/event.enum';
import {DashboardService} from '../../../../service/dashboard.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard-reservation-card-time',
  templateUrl: './dashboard-reservation-card-time.component.html',
  styleUrls: ['./dashboard-reservation-card-time.component.scss'],
  imports: [
    TranslateModule,
    NgForOf,
    FormsModule
  ],
  standalone: true
})
export class DashboardReservationCardTimeComponent extends MySubscribable implements OnInit {


    @Input('label') public label: string;
    @Input('times') public times: string[];

    public model: any;
    public selectedTime: string;

    constructor(
        public broadcastService: BroadcastService,
        public demoService: DemoService,
        public dashboardService: DashboardService
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
