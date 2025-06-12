import {Component, HostListener, OnInit} from '@angular/core';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {ServiceType} from '../../../enum/service-type';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {MyDate} from '../../../model/date';
import {ServiceMax} from '../../../model/service-max';
import {
  FormDateWindowForAppointmentAndDeviceComponent
} from './form-date-window-for-appointment-and-device/form-date-window-for-appointment-and-device.component';
import {NgIf} from '@angular/common';
import {
  FormDateWindowForAppointmentAndDeviceDayDurationComponent
} from './form-date-window-for-appointment-and-device-day-duration/form-date-window-for-appointment-and-device-day-duration.component';
import {FormDateWindowForCourseComponent} from './form-date-window-for-course/form-date-window-for-course.component';

@Component({
  selector: 'app-form-date-window',
  templateUrl: './form-date-window.component.html',
  styleUrls: ['./form-date-window.component.scss'],
  imports: [
    FormDateWindowForAppointmentAndDeviceComponent,
    NgIf,
    FormDateWindowForAppointmentAndDeviceDayDurationComponent,
    FormDateWindowForCourseComponent
  ],
  standalone: true
})
export class FormDateWindowComponent implements OnInit {

  public today: MyDate;
  public date: MyDate;

  public model: any;

  public isMobile: boolean;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
  ) {
    this.onResize();
  }

  public isDurationInDays(): boolean {
    const service: ServiceMax = this.formService.calendarEvent.service;
    if (service.durationNotSpecified) {
      return service.durationMin.days && service.durationMin.days > 0;
    }
    return service.duration.days && service.duration.days > 0;
  }

  public ngOnInit() {

  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth <= 767) { // 767 its because otherwise datepicker and time picker are bellow each other and it look ugly
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public get serviceType(): typeof ServiceType {
    return ServiceType;
  }

  public validate(): boolean {
    if (this.formService.calendarEvent.service.type === ServiceType.APPOINTMENT ||
      this.formService.calendarEvent.service.type === ServiceType.DEVICE) {
      if (this.isDurationInDays() && this.formService.calendarEvent.startDate) {
        return true;
      }
      if (!this.isDurationInDays() && this.formService.calendarEvent.startDate && this.formService.calendarEvent.startTime) {
        return true;
      }
    } else if (this.formService.calendarEvent.service.type === ServiceType.COURSE &&
      this.formService.calendarEvent.id) {
      return true;
    }
    return false;
  }
}
