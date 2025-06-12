import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormService} from '../../../service/form.service';
import {MyDate} from '../../../model/date';
import {Time} from '../../../model/time';

@Component({
    selector: 'app-reservation-to-course',
    templateUrl: './reservation-to-course.component.html',
    styleUrls: ['./reservation-to-course.component.scss'],
    standalone: true
})
export class ReservationToCourseComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {
  }

  ngOnInit() {
    const serviceId: number = Number(this.route.snapshot.paramMap.get('service'));
    const courseId: string = this.route.snapshot.paramMap.get('course');
    const remainingCapacity: number = Number(this.route.snapshot.paramMap.get('remaining_capacity'));
    const date: Date = new Date(decodeURIComponent(this.route.snapshot.paramMap.get('date')));
    const myDate: MyDate = new MyDate(date);
    const time: Time = new Time(date.getHours(), date.getMinutes());
    this.formService.openReservationFormForCourse(serviceId, courseId, remainingCapacity, myDate, time);
  }

}
