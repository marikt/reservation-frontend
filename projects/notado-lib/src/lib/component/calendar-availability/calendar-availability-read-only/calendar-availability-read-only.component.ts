import {Component} from '@angular/core';
import {FormService} from '../../../service/form.service';
import {LanguageService} from '../../../service/language.service';
import {HttpService} from '../../../service/http.service';
import {Server} from '../../../../config/server';
import {ModalService} from '../../../service/modal.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {CalendarAvailabilityRootComponent} from '../calendar-availability-root.component';
import {
  CalendarCommonModule,
  CalendarDayModule,
  CalendarEventTitleFormatter,
  CalendarMonthModule,
  CalendarWeekModule
} from 'angular-calendar';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {FormUrlPipe} from '../../../pipe/form-url.pipe';
import {SafeUrlForFormPipe} from '../../../pipe/safe-url-for-form.pipe';
import {CustomEventTitleFormatter} from '../custom-event-title-formatter';

@Component({
  selector: 'app-calendar-availability-read-only',
  templateUrl: './calendar-availability-read-only.component.html',
  styleUrls: ['./calendar-availability-read-only.component.scss'],
  imports: [
    TranslateModule,
    CalendarCommonModule,
    NgSwitch,
    CalendarMonthModule,
    NgSwitchCase,
    CalendarWeekModule,
    CalendarDayModule,
    NgIf,
    NgForOf,
    NgbTooltip,
    FormUrlPipe,
    SafeUrlForFormPipe
  ],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter,
    },
  ],
  standalone: true
})
export class CalendarAvailabilityReadOnlyComponent extends CalendarAvailabilityRootComponent {

  constructor(public formService: FormService,
              public languageService: LanguageService,
              public http: HttpService,
              public modalService: ModalService,
              public translate: TranslateService,
              public server: Server) {
    super(formService, languageService, http, modalService, translate, server);
  }

}
