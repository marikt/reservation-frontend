import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {PublicApi} from '../../../model/public-api';
import {ErrorResponse} from '../../../../../projects/notado-lib/src/lib/util/error-response';
import {HttpErrorResponse} from '@angular/common/http';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard-api',
  templateUrl: './dashboard-api.component.html',
  styleUrls: ['./dashboard-api.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    FormsModule
  ],
  standalone: true
})
export class DashboardApiComponent implements OnInit {

  public apiKey: string;

  constructor(public http: HttpService,
              public dashboardService: DashboardService,
              public alertService: AlertService,
              public translate: TranslateService) {
  }

  ngOnInit(): void {
    this.http.get(Api.PUBLIC_API + '/' + this.dashboardService.business.id,
      (publicApi: PublicApi) => {
        this.apiKey = publicApi.key;
      }, (errorResponse: HttpErrorResponse) => {
        const error: ErrorResponse = errorResponse.error;
        const errorStatus: number = error.status;
        if (errorStatus === 404) {
          this.resetApiKey();
        }
      });
  }

  public resetApiKey(): void {
    this.http.put(Api.PUBLIC_API + '/' + this.dashboardService.business.id, null,
      (publicApi: PublicApi) => {
        this.apiKey = publicApi.key;
      });
  }

  public copyApiKey(): void {
    navigator.clipboard.writeText(this.apiKey).then().catch(e => console.log(e));
    this.alertService.addInfo('Api Key Copied ' + this.apiKey);
  }
}
