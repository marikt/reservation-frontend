import {Component, OnInit} from '@angular/core';
import {FormService} from '../../../service/form.service';
import {MyForm} from '../../../util/my-form';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {UserService} from '../../../security/service/user.service';
import {LanguageService} from '../../../service/language.service';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ModeService} from '../../../../config/mode.service';
import {Api} from '../../../enum/api';
import {ServiceType} from '../../../enum/service-type';
import {FormThanksWindowComponent} from '../form-thanks-window/form-thanks-window.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-form-paid-thanks-window',
  templateUrl: './form-paid-thanks-window.component.html',
  styleUrls: ['./form-paid-thanks-window.component.scss'],
  imports: [
    FormThanksWindowComponent,
    TranslateModule
  ],
  standalone: true
})
export class FormPaidThanksWindowComponent extends MyForm implements OnInit {

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public userService: UserService,
    public languageService: LanguageService,
    public router: Router,
    private route: ActivatedRoute,
    private modeService: ModeService
  ) {
    super(formService, broadcastService, http, metaService, languageService);
  }

  public ngOnInit() {
    super.ngOnInit();
    const sessionId: string = this.route.snapshot.paramMap.get('session_id');
    if (sessionId !== 'payment-processed') {
      this.formService.loadBusinessAndTemplate(() => {
        this.http.get(Api.CALENDAR_EVENT + '/by-session-id/' + sessionId, (calendarEvent: any) => {
          this.formService.calendarEvent = calendarEvent;
          this.formService.idx = this.formService.urlToValue('form-thanks-paid');
          this.http.get(Api.SERVICE + '/' + calendarEvent.serviceId, (service: any) => {
            this.formService.calendarEvent.service = service;
            this.formService.calendarEvent.service.duration = calendarEvent.duration;
            if (this.formService.calendarEvent.service.type === ServiceType.APPOINTMENT) {
              this.http.get(Api.WORKER + '/' + calendarEvent.workerId, (worker: any) => {
                this.formService.calendarEvent.worker = worker;
              });
            } else if (this.formService.calendarEvent.service.type === ServiceType.DEVICE) {
              this.http.get(Api.DEVICE + '/' + calendarEvent.deviceId, (device: any) => {
                this.formService.calendarEvent.device = device;
              });
            }
          });
        });
      });
      this.formService.createReservationFromSession(sessionId);
      this.router.navigate([this.modeService.urlPrefix + 'form-thanks-paid/payment-processed']);
    }
    this.formService.idx = this.formService.template.windows.length - 1;
  }

  public validate(): boolean {
    return true;
  }

}
