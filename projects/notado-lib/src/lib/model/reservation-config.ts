import { CalendarView } from 'angular-calendar';

export enum TimeRoundingInterval {
  QUARTER_HOUR = 'QUARTER_HOUR',
  HALF_HOUR = 'HALF_HOUR',
  HOUR = 'HOUR'
}

export class ReservationConfig {
  public id: number;
  public businessId: number;

  /**
   * Define in hrs when customer can make reservation earliest
   * calculated: now() + reservationTimePrefix
   *
   * eg: if reservationTimePrefix = 12hrs, then you can book your massage 12hrs in advance the earliest
   *
   */
  public reservationTimePrefix: number;

  public reservationTimePostfix: number;

  /**
   * Define when latest possible customer can cancel reservation
   * eg: if cancelReservationTimePrefix = 12hrs, then you can cancel reservation
   * when (now() + 12hrs) < timeOfReservation
   */
  public cancelReservationTimePrefix: number;
  public deleteReservationOnCancel: boolean;
  public archiveReservationOnCancel: boolean;
  public archiveReservationCalendar: string;
  public showCancelReservationReason: boolean;

  /**
   * when timeWindowSize = 1 than offered times for reservation is : 8:00, 9:00, 10:00 ...
   * when timeWindowSize = 2 than offered times for reservation is : 8:00, 10:00, 12:00 ...
   * when timeWindowSize = 3 than offered times for reservation is : 8:00, 11:00, 14:00 ...
   *
   * timeWindowSize is ignored by ManyToOne service
   */
  public timeWindowSize: number;

  public noDateAvailableMessage: number;

  /**
   * Controls whether to show the notification button when no time slots are available
   * When true, users can register to be notified when a slot becomes available
   */
  public showNotificationButton: boolean;

  public includeAttendeeName: boolean;
  public includeAttendeeEmail: boolean;
  public hideEventNameForCalendarAvail: boolean;
  public timeWindowFrom: string;
  public overtimeEnabled: boolean;
  public addEventDescription: boolean;
  public workerLabel: string;
  /**
   * For services where you can set custom duration
   */
  public durationShiftWindow: number;
  public defaultCalendarAvailabilityView: CalendarView;

  /**
   * Controls the rounding of time slots for reservations
   * QUARTER_HOUR: Rounds to nearest 15 minutes (e.g., 9:00, 9:15, 9:30, 9:45)
   * HALF_HOUR: Rounds to nearest 30 minutes (e.g., 9:00, 9:30, 10:00)
   * HOUR: Rounds to nearest hour (e.g., 9:00, 10:00, 11:00)
   */
  public timeRoundingInterval: TimeRoundingInterval;
}
