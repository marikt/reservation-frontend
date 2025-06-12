import {Component} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {BroadcastService} from '../../../../service/broadcast.service';
import {HttpService} from '../../../../service/http.service';
import {LanguageService} from '../../../../service/language.service';
import {MetaForFormService} from '../../../../service/meta-for-form.service';
import {Event} from '../../../../util/event.enum';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {JsonPipe, NgForOf, NgIf, NgTemplateOutlet} from '@angular/common';
import {FormCourseItemComponent} from '../../../form/other/form-course-item/form-course-item.component';
import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {FormTimeComponent} from '../../../form/other/form-time/form-time.component';
import {FormDateAndTimeItemComponent} from '../../../form/other/form-date-and-time-item/form-date-and-time-item.component';
import {FormDateWindowRootComponent} from '../form-date-window-root-component.directive';
import {AddAlphaColorPipe} from '../../../../pipe/add-alpha-color.pipe';
import {NotificationOnCancelService} from '../../../../service/notification-on-cancel.service';
import {MyDate} from '../../../../model/date';

@Component({
  selector: 'app-form-date-window-for-course',
  templateUrl: './form-date-window-for-course.component.html',
  styleUrls: ['./form-date-window-for-course.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    FormCourseItemComponent,
    NgForOf,
    NgbDatepicker,
    FormsModule,
    FormTimeComponent,
    FormDateAndTimeItemComponent,
    AddAlphaColorPipe,
    NgTemplateOutlet,
    JsonPipe
  ],
  standalone: true
})
export class FormDateWindowForCourseComponent extends FormDateWindowRootComponent {
  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public notificationService: NotificationOnCancelService
  ) {
    super(formService, broadcastService, http, metaService, languageService);
  }

  public addAllDates() {
    // Filter events to only include those with hasCapacity = true
    const eventsWithCapacity = this.formService.eventHolderService.alreadyExistingEvents.filter(
      event => event.hasCapacity
    );

    // Add only events with capacity
    eventsWithCapacity.forEach(
      event => {
        this.fire(Event.RESERVATION_TIME_SELECTED);
        this.formService.calendarEvent.id = event.id;
        this.formService.calendarEvent.keyguruReservationId = event.keyguruReservationId;
        this.formService.calendarEvent.startDate = event.startDate;
        this.formService.calendarEvent.startTime = event.startTime;
        this.formService.calendarEvent.timeMinutes = event.startTime.minutes;
        this.formService.tryToPushDateAndTimes();
      }
    )
  }

  public ngOnInit() {
    super.init();
  }

  /**
   * Check if a day has courses but all of them have no capacity
   * Similar to isDayEnableForCourse but returns true when there are courses but none with capacity
   */
  public hasOnlyCoursesWithNoCapacity(date: MyDate): boolean {
    const coursesByDate = this.formService.eventHolderService.getEventsByDate(date);
    if (coursesByDate && coursesByDate.length > 0) {
      const coursesWithCapacity = coursesByDate.filter(course => course.hasCapacity);
      return coursesWithCapacity.length === 0;
    }
    return false;
  }

  /**
   * Get the count of events that have available capacity
   */
  public getEventsWithCapacityCount(): number {
    return this.formService.eventHolderService.alreadyExistingEvents
      .filter(event => event.hasCapacity).length;
  }

}
