import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormService} from '../../../service/form.service';
import {MyDate} from '../../../model/date';

@Component({
    selector: 'app-reservation-to-date',
    templateUrl: './reservation-to-date.component.html',
    styleUrls: ['./reservation-to-date.component.scss'],
    standalone: true
})
export class ReservationToDateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {
  }

  ngOnInit() {
    const date: Date = new Date(decodeURIComponent(this.route.snapshot.paramMap.get('date')));
    const myDate: MyDate = new MyDate(date);
    this.formService.openReservationFormForDate(myDate);
  }

}
