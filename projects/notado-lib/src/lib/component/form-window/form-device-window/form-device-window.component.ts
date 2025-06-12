import {Component, OnInit} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {Server} from '../../../../config/server';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {ServiceType} from '../../../enum/service-type';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {Event} from '../../../util/event.enum';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-form-device-window',
  templateUrl: './form-device-window.component.html',
  styleUrls: ['./form-device-window.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class FormDeviceWindowComponent extends MyForm implements OnInit {

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public server: Server,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  validate(): boolean {
    if (this.formService.calendarEvent.service.type === ServiceType.COURSE) {
      return true
    }

    if ((this.formService.calendarEvent.service.type === ServiceType.DEVICE ||
      this.formService.calendarEvent.service.type === ServiceType.RENT) && this.formService.calendarEvent.device) {
      return true
    }
    return false;
  }

  public deviceSelected($event: any) {
    this.valid = true;
    this.formService.calculateTimesOnDeviceChange($event)
    this.fire(Event.RESERVATION_DEVICE_SELECTED);
  }

  public get serviceType(): typeof ServiceType {
    return ServiceType;
  }
}
