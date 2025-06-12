import {Component, OnInit} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {ComponentTypeEnum} from '../../../util/component-type.enum';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {CustomField} from '../../../model/reservation-form/custom-field';
import {NgbInputDatepicker, NgbTimepicker, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {MyDate} from '../../../model/date';
import {Api} from '../../../enum/api';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';

@Component({
  selector: 'app-form-custom-window',
  templateUrl: './form-custom-window.component.html',
  styleUrls: ['./form-custom-window.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    ColorPickerModule,
    NgbTimepicker,
    NgbInputDatepicker
  ],
  standalone: true
})
export class FormCustomWindowComponent extends MyForm implements OnInit {

  public customFields: CustomField[] = [];

  public attendeesLimit: number = 1;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
    config: NgbTimepickerConfig
  ) {
    super(formService, broadcastService, http, metaService, languageService);
    config.seconds = false;
    config.spinners = false;
  }

  public ngOnInit() {
    super.ngOnInit();

    if (!this.window.config) {
      this.customFields = [];
      return;
    }

    for (const customFieldsForService of this.window.config.customFieldsForServices) {
      if (customFieldsForService && customFieldsForService.serviceId === this.formService.calendarEvent.service.id) {
        this.customFields = customFieldsForService.customFields;
        break;
      }
    }
    if (!this.customFields) {
      this.customFields = this.window.config.customFields;
    }

    if (!this.customFields) {
      this.customFields = [];
    }

    this.formService.calendarEvent.customFields = [];
    if (this.window.config.customFields) {
      for (const customField of this.customFields) {
        switch (customField.componentType) {
          case ComponentTypeEnum.CHECKBOX:
            customField.value = false;
            break;
          case ComponentTypeEnum.TEXT:
          case ComponentTypeEnum.COLOR:
          case ComponentTypeEnum.TEXTAREA:
            customField.value = '';
            break;
          case ComponentTypeEnum.ATTENDEES:
            customField.value = 1;
            if (this.formService.calendarEvent &&
              this.formService.calendarEvent.remainingCapacity &&
              this.formService.calendarEvent.remainingCapacity !== -1) {
              // This is set when client select course from calendar avail
              this.attendeesLimit = this.formService.calendarEvent.remainingCapacity;
            } else {
              this.http.post(Api.CALENDAR_EVENT + '/remaining-capacity',
                this.formService.calendarEvent,
                (attendeesLimit: number) => {
                  this.attendeesLimit = attendeesLimit;
                });
            }
            break;
          case ComponentTypeEnum.TIMEPICKER:
            const dateTime: Date = new Date();
            customField.value = {hour: dateTime.getHours(), minute: dateTime.getMinutes()};
            break;
          case ComponentTypeEnum.DATEPICKER:
            const now = new MyDate();
            customField.value = now;
            break;
        }
        this.formService.calendarEvent.customFields.push(customField)
      }
    }
  }

  public validate(): boolean {
    return true;
  }

  public getDatePickerColor(selected: boolean): string {
    if (selected) {
      return this.formService.template.componentColor;
    }
    return 'transparent';
  }

  public get componentType(): typeof ComponentTypeEnum {
    return ComponentTypeEnum;
  }

  public attendeesWasEdited($event): void {
    if ($event.value > this.attendeesLimit) {
      $event.value = this.attendeesLimit;
    }
    this.formService.calendarEvent.requestedAttendeesNo = $event.value;
  }
}
