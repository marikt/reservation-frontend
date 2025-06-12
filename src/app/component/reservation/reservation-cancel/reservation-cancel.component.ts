import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {HealthCheckResult} from '../../../model/health-check-result';
import {ActivatedRoute} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReservationConfig} from '../../../../../projects/notado-lib/src/lib/model/reservation-config';

@Component({
  selector: 'app-reservation-cancel',
  templateUrl: './reservation-cancel.component.html',
  styleUrls: ['./reservation-cancel.component.scss'],
  imports: [
    NgIf,
    TranslateModule,
    FormsModule
  ],
  standalone: true
})
export class ReservationCancelComponent implements OnInit {

  public healthCheckResults: HealthCheckResult[] = [];
  public result: ReservationCancelResult = ReservationCancelResult.UNKNOWN;
  protected tokenHolder: TokenHolder;
  public reservationConfig: ReservationConfig;

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
    // business-id-from-cancel-token

    this.http.post(Api.CALENDAR_EVENT + '/business-id-from-cancel-token', this.tokenHolder,
      (businessId: number) => {
        this.http.get(Api.RESERVATION_CONFIG + '/' + businessId,
          (reservationConfig: ReservationConfig) => {
            this.reservationConfig = reservationConfig;
          }
        );
      });
  }


  ngOnInit(): void {
  }

  public get reservationCancelResult(): typeof ReservationCancelResult {
    return ReservationCancelResult;
  }

  public cancelReservation() {
    this.http.post(Api.CALENDAR_EVENT + '/cancel', this.tokenHolder,
      (result: ReservationCancelResult) => {
        this.result = result;
      },
      () => {
      });
  }
}

export class TokenHolder {
  public token: String;
  public reason: String;
}


export enum ReservationCancelResult {
  UNKNOWN = 'UNKNOWN',
  CANCELED = 'CANCELED',
  CANCELED_AFTER_TIME_LIMIT = 'CANCELED_AFTER_TIME_LIMIT'
}
