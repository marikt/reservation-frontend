import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MyForm} from '../../../../util/my-form';
import {FormService} from '../../../../service/form.service';
import {BroadcastService} from '../../../../service/broadcast.service';
import {Time} from '../../../../model/time';
import {Event} from '../../../../util/event.enum';
import {HttpService} from '../../../../service/http.service';
import {LanguageService} from '../../../../service/language.service';
import {ServiceType} from '../../../../enum/service-type';
import {MetaForFormService} from '../../../../service/meta-for-form.service';
import {MyDate} from '../../../../model/date';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {MinutesToTimePipe} from '../../../../pipe/minutes-to-time.pipe';


@Component({
  selector: 'app-form-time',
  templateUrl: './form-time.component.html',
  styleUrls: ['./form-time.component.scss'],
  imports: [
    TranslateModule,
    FormsModule,
    NgForOf,
    MinutesToTimePipe
  ],
  standalone: true
})
export class FormTimeComponent extends MyForm implements OnInit {

  @Input('label') public label: string;
  @Input('times') public times: number[];

  public model: any;
  public isMobile: boolean;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
    this.onResize();
    this.subscribe(Event.RESERVATION_WORKER_SELECTED, () => {
      if (this.formService.calendarEvent.service.allowMultipleBooking) {
        this.formService.calendarEvent.timeMinutes = null;
        this.formService.calendarEvent.startTime = null; // reset
      }
      if (!this.formService.calendarEvent.service.allowMultipleBooking &&
        this.formService.calendarEvent.timeMinutes) {
        this.setCalendarEventTime(this.formService.calendarEvent.timeMinutes); // keep selecting same time
      }
    });
  }

  public ngOnInit() {
  }

  public setCalendarEventTime(minutes: number) {
    this.formService.calendarEvent.startTime = Time.getTimeFromMinutes(minutes);
    this.formService.calendarEvent.timeMinutes = minutes;
    switch (this.formService.calendarEvent.type) {
      case ServiceType.APPOINTMENT:
        this.formService.calculateWorkersOrDevicesAvailability(this.formService.calendarEvent.startDate, this.formService.calendarEvent.worker);
        break;
      case ServiceType.DEVICE:
        this.formService.calculateWorkersOrDevicesAvailability(this.formService.calendarEvent.startDate, this.formService.calendarEvent.device);
        break;
      case ServiceType.COURSE:
        for (const course of this.formService.eventHolderService.alreadyExistingEvents) {
          if (this.formService.calendarEvent.startDate &&
            this.formService.calendarEvent.startTime &&
            MyDate.isEqual(this.formService.calendarEvent.startDate, course.startDate) &&
            Time.isEqual(this.formService.calendarEvent.startTime, course.startTime)) {
            this.formService.calendarEvent.id = course.id;
            this.formService.calendarEvent.keyguruReservationId = course.keyguruReservationId;
            break;
          }
        }
        break;
    }
    this.formService.tryToPushDateAndTimes();
    this.fire(Event.RESERVATION_TIME_SELECTED);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public validate(): boolean {
    return true;
  }

  public skip(): boolean {
    return false;
  }

}
