import {Component, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {MyDate} from '../../../../../../projects/notado-lib/src/lib/model/date';
import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {DemoFormTimeComponent} from '../demo-form-time/demo-form-time.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-demo-modal-date',
  templateUrl: './demo-modal-date.component.html',
  styleUrls: ['./demo-modal-date.component.scss', '../demo.component.scss'],
  imports: [
    NgbDatepicker,
    FormsModule,
    DemoFormTimeComponent,
    TranslateModule
  ],
  standalone: true
})
export class DemoModalDateComponent implements OnInit {
    public model: any;

    public today: MyDate;
    public date: { year: number; month: number };

    public timesMorning: string[];
    public timesNoon: string[];
    public timesAfternoon: string[];

    constructor(public demoService: DemoService
    ) {
    }

    ngOnInit() {

        this.timesMorning = [];
        this.timesMorning.push('8:00');
        this.timesMorning.push('9:30');
        this.timesMorning.push('10:40');

        this.timesNoon = [];
        this.timesNoon.push('11:00');
        this.timesNoon.push('12:30');
        this.timesNoon.push('13:30');

        this.timesAfternoon = [];
        this.timesAfternoon.push('15:30');
        this.timesAfternoon.push('18:00');

        this.today = new MyDate();

        const tomorrow: Date = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        this.date = new MyDate(tomorrow);

    }

}
