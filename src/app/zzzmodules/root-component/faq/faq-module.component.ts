import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {FaqAttendeesComponent} from '../../../component/faq/faq/faq-items/faq-attendees/faq-attendees.component';
import {FaqIntroComponent} from '../../../component/faq/faq/faq-items/faq-intro/faq-intro.component';
import {FaqGoogleCalendarComponent} from '../../../component/faq/faq/faq-items/faq-google-calendar/faq-google-calendar.component';
import {FaqTimeManagementComponent} from '../../../component/faq/faq/faq-items/faq-time-management/faq-time-management.component';
import {FaqNotificationComponent} from '../../../component/faq/faq/faq-items/faq-notification/faq-notification.component';
import {
  FaqNotificationFromOwnEmailComponent
} from '../../../component/faq/faq/faq-items/faq-notification-from-own-email/faq-notification-from-own-email.component';
import {FaqZoomComponent} from '../../../component/faq/faq/faq-items/faq-zoom/faq-zoom.component';
import {FaqVacationComponent} from '../../../component/faq/faq/faq-items/faq-vacation/faq-vacation.component';
import {FaqOvertimeComponent} from '../../../component/faq/faq/faq-items/faq-overtime/faq-overtime.component';
import {
  FaqSpecificCloseDaysComponent
} from '../../../component/faq/faq/faq-items/faq-specific-close-days/faq-specific-close-days.component';
import {FaqEditEventComponent} from '../../../component/faq/faq/faq-items/faq-edit-event/faq-edit-event.component';
import {FaqCancelEventComponent} from '../../../component/faq/faq/faq-items/faq-cancel-event/faq-cancel-event.component';
import {FaqPhoneBookingComponent} from '../../../component/faq/faq/faq-items/faq-phone_booking/faq-phone-booking.component';
import {FaqVoucherComponent} from '../../../component/faq/faq/faq-items/faq-voucher/faq-voucher.component';
import {FaqPaymentComponent} from '../../../component/faq/faq/faq-items/faq-payment/faq-payment.component';
import {FaqShareComponent} from '../../../component/faq/faq/faq-items/faq-share/faq-share.component';
import {FaqTimezoneComponent} from '../../../component/faq/faq/faq-items/faq-timezone/faq-timezone.component';
import {FaqCourseComponent} from '../../../component/faq/faq/faq-items/faq-course/faq-course.component';
import {FaqMultipleBusinessComponent} from '../../../component/faq/faq/faq-items/faq-multiple-business/faq-multiple-business.component';
import {
  FaqButtonForEachServiceComponent
} from '../../../component/faq/faq/faq-items/faq-button-for-each-service/faq-button-for-each-service.component';
import {FaqCustomerComponent} from '../../../component/faq/faq/faq-items/faq-customer/faq-customer.component';
import {
  FaqSubscriptionCancelComponent
} from '../../../component/faq/faq/faq-items/faq-subscription-cancel/faq-subscription-cancel.component';
import {FaqInvoiceComponent} from '../../../component/faq/faq/faq-items/faq-invoice/faq-invoice.component';

@Component({
  selector: 'app-faq-module',
  templateUrl: './faq-module.component.html',
  styleUrls: ['./faq-module.component.scss'],
  imports: [
    RouterLink,
    TranslateModule,
    RouterOutlet,
    CommonModule,
    FaqAttendeesComponent,
    FaqIntroComponent,
    FaqGoogleCalendarComponent,
    FaqTimeManagementComponent,
    FaqNotificationComponent,
    FaqNotificationFromOwnEmailComponent,
    FaqZoomComponent,
    FaqVacationComponent,
    FaqOvertimeComponent,
    FaqSpecificCloseDaysComponent,
    FaqEditEventComponent,
    FaqCancelEventComponent,
    FaqPhoneBookingComponent,
    FaqVoucherComponent,
    FaqPaymentComponent,
    FaqShareComponent,
    FaqTimezoneComponent,
    FaqCourseComponent,
    FaqMultipleBusinessComponent,
    FaqButtonForEachServiceComponent,
    FaqCustomerComponent,
    FaqSubscriptionCancelComponent,
    FaqInvoiceComponent
  ],
  standalone: true
})
export class FaqModuleComponent implements OnInit {

  public items: FAQItem[] = [];
  public bigMenu: boolean = true;

  constructor(
    public languageService: LanguageService,
    public userService: UserService
  ) {
  }


  // TODO payments, holidays,
  ngOnInit() {
    if (this.languageService.isCzOrSk()) {
      this.items.push(new FAQItem('INTRO', 'intro'));
    }
    this.items.push(new FAQItem('ATTENDEES', 'attendees'));
    this.items.push(new FAQItem('GOOGLE_CALENDAR', 'google-calendar'));
    this.items.push(new FAQItem('TIME_MANAGEMENT', 'time-management'));
    this.items.push(new FAQItem('NOTIFICATION', 'notification'));
    this.items.push(new FAQItem('NOTIFICATION_FROM_OWN_EMAIL', 'notification-from-own-email'));
    this.items.push(new FAQItem('ZOOM', 'zoom'));
    this.items.push(new FAQItem('VACATION', 'vacation'));
    this.items.push(new FAQItem('OVERTIME', 'overtime'));
    this.items.push(new FAQItem('SPECIFIC_CLOSE_DAYS', 'specific-close-days'));
    this.items.push(new FAQItem('EDIT_EVENT', 'edit-event'));
    this.items.push(new FAQItem('CANCEL_EVENT', 'cancel-event'));
    this.items.push(new FAQItem('PHONE_BOOKING', 'phone-booking'));
    this.items.push(new FAQItem('VOUCHER', 'voucher'));
    this.items.push(new FAQItem('PAYMENT', 'payment'));
    this.items.push(new FAQItem('SHARE', 'share'));
    this.items.push(new FAQItem('TIME_ZONE', 'timezone'));
    // this.items.push(new FAQItem('CONFIRMATION', 'confirmation'));
    // this.items.push(new FAQItem('NOTREGULLAR', 'notregullar'));
    this.items.push(new FAQItem('COURSE', 'course'));
    this.items.push(new FAQItem('MULTIPLE_BUSINESS', 'multiple-business'));
    this.items.push(new FAQItem('BUTTON_FOR_EACH_SERVICE', 'button-for-each-service'));
    // this.items.push(new FAQItem('CACHE', 'cache'));
    this.items.push(new FAQItem('CUSTOMER', 'customer'));
    this.items.push(new FAQItem('SUBSCRIPTION_CANCEL', 'subscription-cancel'));
    this.items.push(new FAQItem('INVOICE', 'invoice'));

  }
}

export class FAQItem {
  public name: string;
  public link: string;


  constructor(name: string, link: string) {
    this.name = name;
    this.link = link;
  }
}
