import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {
  CalendarCommonModule,
  CalendarDayModule,
  CalendarEventTitleFormatter,
  CalendarMonthModule,
  CalendarWeekModule
} from 'angular-calendar';
import {MyDate} from '../../../model/date';
import {FormService} from '../../../service/form.service';
import {LanguageService} from '../../../service/language.service';
import {HttpService} from '../../../service/http.service';
import {Server} from '../../../../config/server';
import {ModalService} from '../../../service/modal.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CalendarAvailabilityRootComponent} from '../calendar-availability-root.component';
import {FormsModule} from '@angular/forms';
import {JsonPipe, NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {FormUrlPipe} from '../../../pipe/form-url.pipe';
import {SafeUrlForFormPipe} from '../../../pipe/safe-url-for-form.pipe';
import {CustomEventTitleFormatter} from '../custom-event-title-formatter';
import {NotificationOnCancelService} from '../../../service/notification-on-cancel.service';

@Component({
  selector: 'app-calendar-availability',
  templateUrl: './calendar-availability.component.html',
  styleUrls: ['./calendar-availability.component.scss'],
  imports: [
    TranslateModule,
    CalendarCommonModule,
    NgSwitchCase,
    NgSwitch,
    CalendarMonthModule,
    CalendarWeekModule,
    CalendarDayModule,
    NgIf,
    NgForOf,
    NgbTooltip,
    FormUrlPipe,
    SafeUrlForFormPipe,
    JsonPipe,
    FormsModule,
    NgClass
  ],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  standalone: true
})
export class CalendarAvailabilityComponent extends CalendarAvailabilityRootComponent implements AfterViewInit {

  constructor(public formService: FormService,
              public languageService: LanguageService,
              public http: HttpService,
              public modalService: ModalService,
              public translate: TranslateService,
              public server: Server,
              public notificationService: NotificationOnCancelService) {
    super(formService, languageService, http, modalService, translate, server, notificationService);
  }

  /**
   * Register for notification when a time slot or course spot becomes available
   */
  public registerForNotification(): void {
    if (this.selectedEventWithCapacity) {
      // Convert JavaScript Date to MyDate object
      const eventDate = new MyDate(new Date(this.selectedEventWithCapacity.start));

      this.notificationService.registerForNotification(
        eventDate,
        this.selectedEventWithCapacity.id,
        true
      );
    }
  }

  /**
   * After view init, set up the badge display for events with no capacity
   */
  ngAfterViewInit() {
    // Wait for the calendar to render
    setTimeout(() => {
      this.setupBadgeDisplay();
    }, 500);
  }

  /**
   * Set up badge display for events with no capacity
   */
  protected setupBadgeDisplay(): void {
    // Find all calendar events with no capacity
    const eventsWithoutCapacity = document.querySelectorAll('.calendar-availability-without-capacity');

    // For each event, ensure the badges are properly set up
    eventsWithoutCapacity.forEach(event => {
      const fullBadge = event.querySelector('.full-badge');
      const notifyBadge = event.querySelector('.notify-badge');

      if (fullBadge && notifyBadge) {
        // Make sure the full badge is visible by default
        (fullBadge as HTMLElement).style.display = 'block';
        // Make sure the notify badge is hidden by default
        (notifyBadge as HTMLElement).style.display = 'none';
      }
    });
  }
}
