import {ChangeDetectorRef, Component} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {BroadcastService} from '../../../../service/broadcast.service';
import {HttpService} from '../../../../service/http.service';
import {LanguageService} from '../../../../service/language.service';
import {MetaForFormService} from '../../../../service/meta-for-form.service';
import {NgbDatepicker, NgbDatepickerNavigateEvent} from '@ng-bootstrap/ng-bootstrap';
import {JsonPipe, NgIf, NgTemplateOutlet} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FormTimeComponent} from '../../../form/other/form-time/form-time.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormDateAndTimeItemComponent} from '../../../form/other/form-date-and-time-item/form-date-and-time-item.component';
import {FormWorkerWindowComponent} from '../../form-worker-window/form-worker-window.component';
import {FormDeviceWindowComponent} from '../../form-device-window/form-device-window.component';
import {FormDateWindowRootComponent} from '../form-date-window-root-component.directive';
import {AddAlphaColorPipe} from '../../../../pipe/add-alpha-color.pipe';
import {NotificationOnCancelService} from '../../../../service/notification-on-cancel.service';

@Component({
  selector: 'app-form-date-window-for-appointment-and-device',
  templateUrl: './form-date-window-for-appointment-and-device.component.html',
  styleUrls: ['./form-date-window-for-appointment-and-device.component.scss'],
  imports: [
    NgbDatepicker,
    NgIf,
    FormsModule,
    FormTimeComponent,
    TranslateModule,
    FormDateAndTimeItemComponent,
    FormWorkerWindowComponent,
    FormDeviceWindowComponent,
    AddAlphaColorPipe,
    NgTemplateOutlet,
    JsonPipe
  ],
  standalone: true
})
export class FormDateWindowForAppointmentAndDeviceComponent extends FormDateWindowRootComponent {
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
}
