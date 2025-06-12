import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormService} from '../../../service/form.service';
import {MyDate} from '../../../model/date';
import {Time} from '../../../model/time';

@Component({
  selector: 'app-reservation-to-service',
  templateUrl: './reservation-to-service.component.html',
  styleUrls: ['./reservation-to-service.component.scss'],
  standalone: true
})
export class ReservationToServiceComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {
  }

  ngOnInit() {
    const serviceId = this.route.snapshot.paramMap.get('service');
    const workerId = this.route.snapshot.paramMap.get('worker');

    const dateParam = this.route.snapshot.paramMap.get('date');
    let myDate: MyDate = null;
    let time: Time = null;
    if (dateParam) {
      const date: Date = new Date(decodeURIComponent(dateParam));
      if (date) {
        myDate = new MyDate(date);
        time = new Time(date.getHours(), date.getMinutes());
      }
    }
    this.formService.openReservationFormForService(Number(serviceId), Number(workerId), myDate, time);
  }

}
