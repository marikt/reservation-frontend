import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {FormService} from './form.service';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Api} from '../enum/api';
import {MyDate} from '../model/date';
import {ServiceType} from '../enum/service-type';
import {ModalService} from './modal.service';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

/**
 * Interface for the notification request
 */
export interface NotificationOnReservationCancelRequest {
  email: string;
  serviceId: number;
  eventId?: string; // For course events
  date: any; // Using any to match the MyDate format used in the application
}

@Injectable({
  providedIn: 'root'
})
export class NotificationOnCancelService {
  // Properties for notification form
  public showNotificationForm: boolean = false;
  public notificationEmail: string = '';
  public notificationSuccess: boolean = false;
  public notificationError: string = '';
  public isSubmitting: boolean = false;
  private modalRef: NgbModalRef;

  constructor(
    private http: HttpService,
    private formService: FormService,
    private translate: TranslateService,
    private modalService: ModalService
  ) {
  }

  /**
   * Toggle the notification form visibility
   */
  public toggleNotificationForm(): void {
    this.showNotificationForm = !this.showNotificationForm;
    // Reset form state when toggling
    if (!this.showNotificationForm) {
      this.resetNotificationForm();
    }
  }

  /**
   * Reset the notification form
   */
  public resetNotificationForm(): void {
    this.notificationEmail = '';
    this.notificationSuccess = false;
    this.notificationError = '';
  }

  /**
   * Open the notification modal
   * @param modalTemplate The modal template reference
   */
  public openNotificationModal(modalTemplate: any): void {
    this.resetNotificationForm();
    this.modalRef = this.modalService.open(modalTemplate, {
      size: 'sm',
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'notification-modal-responsive'
    });
  }

  /**
   * Handle click on radio button for courses
   * @param event The mouse event
   * @param remainingCapacity The remaining capacity of the course
   * @param modalTemplate The modal template reference
   */
  public handleCourseRadioClick(event: MouseEvent, remainingCapacity: number, modalTemplate: any): void {
    if (remainingCapacity === 0) {
      this.openNotificationModal(modalTemplate);
      event.stopPropagation();
    }
  }

  /**
   * Check if there are courses for the selected date but with no remaining capacity
   */
  public hasCoursesWithNoCapacity(): boolean {
    // Check if there are events for the selected date
    if (!this.formService?.calendarEvent?.startDate) {
      return false;
    }

    // For the "No Courses" section at the top
    if (!this.formService.eventHolderService.alreadyExistingEvents ||
      this.formService.eventHolderService.alreadyExistingEvents.length === 0) {
      return false;
    }

    // For the calendar view - check if there are events for this date but none are available
    const selectedDate = this.formService.calendarEvent.startDate;
    const eventsForDate = this.formService.eventHolderService.getEventsByDate(selectedDate);

    // If there are events for this date but no available times, it means courses exist but are full
    return eventsForDate && eventsForDate.length > 0 &&
      (!this.formService.timesMorning || this.formService.timesMorning.length === 0) &&
      (!this.formService.timesNoon || this.formService.timesNoon.length === 0) &&
      (!this.formService.timesAfternoon || this.formService.timesAfternoon.length === 0);
  }

  /**
   * Check if notification button should be shown for appointments and devices
   * Hides the button if:
   * 1. It's today and less than 2 hours before closing
   * 2. The business is closed on the selected day
   */
  public shouldShowNotificationButton(worker?: any): boolean {
    try {
      // Check if calendarEvent exists
      if (!this.formService?.calendarEvent?.startDate) {
        return false;
      }

      // Get the opening day for the selected date
      const openingDay = this.formService.getOpeningDay(this.formService.calendarEvent.startDate, worker);

      // If business is closed on this day, don't show the button
      if (!openingDay || openingDay.close || !openingDay.openingDayRanges || openingDay.openingDayRanges.length === 0) {
        return false;
      }

      // Check if it's today
      const today = new Date();
      const selectedDate = new Date(
        this.formService.calendarEvent.startDate.year,
        this.formService.calendarEvent.startDate.month - 1,
        this.formService.calendarEvent.startDate.day
      );

      const isToday = today.getFullYear() === selectedDate.getFullYear() &&
        today.getMonth() === selectedDate.getMonth() &&
        today.getDate() === selectedDate.getDate();

      if (isToday) {
        // Get current time in minutes since midnight
        const currentHours = today.getHours();
        const currentMinutes = today.getMinutes();
        const currentTimeInMinutes = currentHours * 60 + currentMinutes;

        // Find the latest closing time for today
        let latestClosingTime = 0;
        for (const range of openingDay.openingDayRanges) {
          // Check if range and till properties exist
          if (!range?.till) {
            continue;
          }

          // Check if hours and minutes properties exist
          const hours = range.till.hours || 0;
          const minutes = range.till.minutes || 0;

          // Convert Time object to minutes
          const tillTimeInMinutes = (hours * 60) + minutes;
          if (tillTimeInMinutes > latestClosingTime) {
            latestClosingTime = tillTimeInMinutes;
          }
        }

        // If less than 2 hours before closing, don't show the button
        if (latestClosingTime - currentTimeInMinutes < 120) {
          return false;
        }
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Register for notification when a time slot or course spot becomes available
   * @param eventDate Optional specific date for a course event (used from course item component)
   * @param eventId Optional specific event ID for a course (used from course item component)
   * @param isModal Whether this is being called from a modal (affects the success behavior)
   */
  public registerForNotification(eventDate?: MyDate,
                                 eventId?: string,
                                 isModal: boolean = false): void {

    console.log('------------------------------------------------------------------------');
    console.log(JSON.stringify(this.formService.calendarEvent));
    console.log('------------------------------------------------------------------------');
    if (!this.notificationEmail) {
      this.notificationError = this.translate.instant('FORM.EMAIL_REQUIRED');
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.notificationEmail)) {
      this.notificationError = this.translate.instant('FORM.INVALID_EMAIL');
      return;
    }

    this.isSubmitting = true;
    this.notificationError = '';
    this.notificationSuccess = false;

    const request: NotificationOnReservationCancelRequest = {
      email: this.notificationEmail,
      serviceId: this.formService.calendarEvent.service.id,
      date: eventDate || this.formService.calendarEvent.startDate
    };

    // Add event ID if provided directly
    if (eventId) {
      request.eventId = eventId;
    } else if (this.formService.calendarEvent.service.type === ServiceType.COURSE) {
      // Get events for the selected date
      const selectedDate = eventDate || this.formService.calendarEvent.startDate;
      const eventsForDate = this.formService.eventHolderService.getEventsByDate(selectedDate);

      if (eventsForDate && eventsForDate.length > 0) {
        // Find courses for the selected service that have no capacity
        const coursesWithoutCapacity = eventsForDate.filter(event =>
          event.serviceId === this.formService.calendarEvent.service.id && !event.hasCapacity
        );

        // If we found courses without capacity, use the first one's ID
        if (coursesWithoutCapacity.length > 0) {
          request.eventId = coursesWithoutCapacity[0].id;
          console.log('Found course without capacity, using ID:', coursesWithoutCapacity[0].id);
        }
      }
    }

    this.http.post(Api.CALENDAR_EVENT + '/notify-on-cancel/' + this.formService.business.id, request,
      (response) => {
        this.isSubmitting = false;
        this.notificationSuccess = true;

        // Handle success differently based on context (modal vs form)
        if (isModal) {
          // Close the modal after a successful submission after a delay
          setTimeout(() => {
            this.modalService.close();
            this.resetNotificationForm();
          }, 6000);
        } else {
          // Hide the form after a successful submission after a delay
          setTimeout(() => {
            this.showNotificationForm = false;
            this.resetNotificationForm();
          }, 6000);
        }
      },
      (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        if (error.error && error.error.message) {
          this.notificationError = error.error.message;
        } else {
          this.notificationError = this.translate.instant('FORM.NOTIFICATION_ERROR');
        }
      }
    );
  }
}
