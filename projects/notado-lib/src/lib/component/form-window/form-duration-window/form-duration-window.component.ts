import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {Duration} from '../../../model/duration';
import {FormServiceAbstract} from '../../../service/form-service.abstract';
import {MyMath} from '../../../util/my-math';
import {DaysHoursMinutesPipe} from '../../../pipe/hours-minutes.pipe';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-form-duration-window',
  templateUrl: './form-duration-window.component.html',
  styleUrls: ['./form-duration-window.component.scss'],
  imports: [
    DaysHoursMinutesPipe,
    FormsModule
  ],
  standalone: true
})
export class FormDurationWindowComponent extends MyForm implements OnInit {
  public value: number; // Processed value of the slider
  // @Output() valueChange: EventEmitter<number> = new EventEmitter();
  public isMobile: boolean;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
    this.onResize();
  }

  public ngOnInit() {
    super.ngOnInit();
    this.value = this.calculate(this.formService.calendarEvent.service.durationMin);
    this.setServiceDuration();
  }

  public setServiceDuration(): void {
    if (this.formService.calendarEvent.service.durationMin.days && this.formService.calendarEvent.service.durationMin.days > 0) {
      this.formService.calendarEvent.service.duration = new Duration(this.value, 0, 0);
    } else {
      const minutes = this.value * this.formService.getDurationShiftWindow();
      this.formService.calendarEvent.service.duration = new Duration(0, Math.floor(minutes / 60), MyMath.quoter(minutes % 60));
    }
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public validate(): boolean {
    return true;
  }

  public calculate(duration: Duration): number {
    if (duration.days && duration.days > 0) {
      return duration.days;
    }
    return (duration.minutes + duration.hours * 60) / this.formService.getDurationShiftWindow();
  }
}
