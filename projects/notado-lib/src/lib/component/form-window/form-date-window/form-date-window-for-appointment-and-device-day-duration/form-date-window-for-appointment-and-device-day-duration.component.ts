import {Component} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {BroadcastService} from '../../../../service/broadcast.service';
import {HttpService} from '../../../../service/http.service';
import {LanguageService} from '../../../../service/language.service';
import {MetaForFormService} from '../../../../service/meta-for-form.service';
import {MyDate} from '../../../../model/date';
import {NgIf} from '@angular/common';
import {NgbDatepicker, NgbDatepickerNavigateEvent, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormDateAndTimeItemComponent} from '../../../form/other/form-date-and-time-item/form-date-and-time-item.component';
import {FormWorkerWindowComponent} from '../../form-worker-window/form-worker-window.component';
import {FormDeviceWindowComponent} from '../../form-device-window/form-device-window.component';
import {FormDateWindowRootComponent} from '../form-date-window-root-component.directive';
import {AddAlphaColorPipe} from '../../../../pipe/add-alpha-color.pipe';

@Component({
  selector: 'app-form-date-window-for-appointment-and-device-day-duration',
  templateUrl: './form-date-window-for-appointment-and-device-day-duration.component.html',
  styleUrls: ['./form-date-window-for-appointment-and-device-day-duration.component.scss'],
  imports: [
    NgIf,
    NgbDatepicker,
    NgbInputDatepicker,
    FormsModule,
    TranslateModule,
    FormDateAndTimeItemComponent,
    FormWorkerWindowComponent,
    FormDeviceWindowComponent,
    AddAlphaColorPipe
  ],
  standalone: true
})
export class FormDateWindowForAppointmentAndDeviceDayDurationComponent extends FormDateWindowRootComponent {

  public selectedDate: MyDate;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
    public translate: TranslateService,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
  }

  public ngOnInit() {
    super.init();
  }


  public onMonthChange($event: NgbDatepickerNavigateEvent): void {
    if (!$event.current) {
      // this is for case when date was set using form-date-selected/:date
      super.doOnMonthChange(this.date, this.date.day, () => {
      });
    } else {
      super.onMonthChange($event, () => {
        this.formService.calendarEvent.startDate = {
          year: $event.next.year,
          month: $event.next.month,
          day: 1
        };
      });
    }
  }

  public tryToPushDateAndTimes() {
    if (super.isDayDisabledForWholeDay(this.selectedDate)) {
      this.formService.calendarEvent.startDate = null;
    } else {
      this.formService.calendarEvent.startDate = this.selectedDate;
      this.formService.tryToPushDateAndTimes();
    }
  }

}
