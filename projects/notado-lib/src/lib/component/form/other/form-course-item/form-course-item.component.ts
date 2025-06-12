import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {BroadcastService} from '../../../../service/broadcast.service';
import {Time} from '../../../../model/time';
import {Event} from '../../../../util/event.enum';
import {HttpService} from '../../../../service/http.service';
import {LanguageService} from '../../../../service/language.service';
import {MySubscribable} from '../../../../util/my-subscribable';
import {MetaForFormService} from '../../../../service/meta-for-form.service';
import {MyDate} from '../../../../model/date';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {NotificationOnCancelService} from '../../../../service/notification-on-cancel.service';
import {ModalService} from '../../../../service/modal.service';
import {EventFromCalendar} from '../../../../model/event/event-from-calendar';


@Component({
  selector: 'app-form-course-item',
  templateUrl: './form-course-item.component.html',
  styleUrls: ['./form-course-item.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    NgIf,
    NgbTooltip
  ],
  standalone: true
})
export class FormCourseItemComponent extends MySubscribable implements OnInit {

  @Input('event') public event: EventFromCalendar;
  @Input('cardColor') public cardColor: string;
  @Input('textColor') public textColor: string;

  @ViewChild('notificationModal', {static: false}) notificationModal: TemplateRef<any>;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
    public notificationService: NotificationOnCancelService,
    public modalService: ModalService
  ) {
    super(broadcastService);
  }


  public ngOnInit() {
    if (this.formService.calendarEvent.id &&
      this.formService.calendarEvent.id === this.event.id) {
      this.setCalendarEventDate();
    }
  }

  public setCalendarEventDate() {
    if (!this.event.hasCapacity) {
      return;
    }
    this.fire(Event.RESERVATION_TIME_SELECTED);
    this.formService.calendarEvent.id = this.event.id;
    this.formService.calendarEvent.keyguruReservationId = this.event.keyguruReservationId;
    this.formService.calendarEvent.startDate = this.event.startDate;
    this.formService.calendarEvent.startTime = this.event.startTime;
    this.formService.calendarEvent.timeMinutes = this.event.startTime.minutes;
    this.formService.tryToPushDateAndTimes();
  }

  public isOneDayEvent(): boolean {
    return MyDate.isEqual(this.event.startDate, this.event.endDate);
  }

  public getDateLabel(): string {
    return this.event.startDate.day + '.' + this.event.startDate.month + '.' + this.event.startDate.year;
  }

  public getTimeLabel(): string {
    return Time.toString(this.event.startTime);
  }

  public getEndTimeLabel(): string {
    return Time.toString(this.event.endTime);
  }

  public getDayName(): string {
    try {
      return MyDate.getDayName(this.event.startDate, this.languageService.language);
    } catch (e) {
      return '';
    }
  }

  getEndDateLabel(): string {
    return this.event.endDate.day + '.' + this.event.endDate.month + '.' + this.event.endDate.year;
  }

  getEndDayName(): string {
    try {
      return MyDate.getDayName(this.event.endDate, this.languageService.language);
    } catch (e) {
      return '';
    }
  }

  /**
   * Open the notification modal
   */
  public openNotificationModal(): void {
    this.notificationService.openNotificationModal(this.notificationModal);
  }

  /**
   * Handle click on radio button
   * @param event The mouse event
   * @param remainingCapacity The remaining capacity of the course
   */
  public handleRadioClick(event: MouseEvent, remainingCapacity: number): void {
    this.notificationService.handleCourseRadioClick(event, remainingCapacity, this.notificationModal);
  }

  /**
   * Register for notification when a course spot becomes available
   */
  public registerForNotification(): void {
    this.notificationService.registerForNotification(
      this.event.startDate,
      this.event.id,
      true
    );
  }
}
