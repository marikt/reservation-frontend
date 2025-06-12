import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {HealthCheckResult} from '../../../model/health-check-result';
import {ActivatedRoute} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-reservation-confirm',
  templateUrl: './reservation-confirm.component.html',
  styleUrls: ['./reservation-confirm.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class ReservationConfirmComponent implements OnInit {

  public healthCheckResults: HealthCheckResult[] = [];
  private readonly tokenHolder: TokenHolder;
  public confirmed: boolean;

  constructor(
    public http: HttpService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public languageService: LanguageService
  ) {
    const reservationData = this.route.snapshot.paramMap.get('reservation_data');
    const lang = this.route.snapshot.paramMap.get('language');
    if (lang) {
      this.languageService.language = lang;
    } else {
      this.languageService.language = this.languageService.languageDefault;
    }
    this.tokenHolder = new TokenHolder();
    this.tokenHolder.token = reservationData;
  }

  ngOnInit(): void {
  }

  public cancelReservation() {
    this.http.post(Api.CALENDAR_EVENT + '/confirm', this.tokenHolder,
      () => {
        this.confirmed = true;
      },
      () => {
      });

  }
}

export class TokenHolder {
  public token: String;
}

