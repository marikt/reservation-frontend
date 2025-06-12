import {Component, OnInit} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-form-thanks-window',
  templateUrl: './form-thanks-window.component.html',
  styleUrls: ['./form-thanks-window.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class FormThanksWindowComponent extends MyForm implements OnInit {
  public countdown: number = 20;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
    public router: Router,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
  }

  public ngOnInit() {
    super.ngOnInit();

    if (this.window.config &&
      this.window.config.redirectOnReservationFin &&
      this.isValidUrl(this.window.config.redirectOnReservationFin)) {
      this.countdown = 5;
      setTimeout(() => {
          window.location.href = this.window.config.redirectOnReservationFin;
        },
        5_000
      );
    } else {
      this.countdown = 20;
      setTimeout(() => {
          this.formService.openReservationFormForProduction();
        },
        20_000
      );
    }
    const intervalId = setInterval(() => {
      console.log(this.countdown); // log the countdown value
      this.countdown--;
      if (this.countdown < 0) {
        clearInterval(intervalId); // stop the interval when countdown reaches 0
      }
    }, 1000);

  }

  public isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  public validate(): boolean {
    return true;
  }
}
