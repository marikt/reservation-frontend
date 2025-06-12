import {Injectable} from '@angular/core';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {ResponseType} from '../../../projects/notado-lib/src/lib/enum/response-type.enum';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {GoogleCalendarUtil} from '../util/google-calendar-util';
import {DashboardService} from './dashboard.service';
import {SpinnerService} from '../../../projects/notado-lib/src/lib/service/spinner.service';
import {Business} from '../../../projects/notado-lib/src/lib/model/business';
import {CONST} from '../../../projects/notado-lib/src/lib/util/const';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {


  constructor(
    private http: HttpService,
    private dashboardService: DashboardService,
    private spinnerService: SpinnerService
  ) {
  }

  public requestGoogleCalendarToken(): void {
    if (this.dashboardService.business.googleCalendarConnected) {
      console.warn('Google Calendar is already connected.');
      return;
    }
    localStorage.setItem(CONST.GOOGLE_CONNECT_IN_PROGRESS, 'true')
    this.resetGoogleCalendarToken()
  }

  public resetGoogleCalendarToken(): void {
    this.loadGoogleClientId((googleClientId: string) => {
        if (!googleClientId) {
          console.error('googleClientId is null!');
          return;
        }
        localStorage.setItem(CONST.GOOGLE_CONNECT_IN_PROGRESS, 'true')
        this.requestToken(googleClientId);
      }
    );
  }

  private requestToken(googleClientId: string): void {
    const business: Business = this.dashboardService.business;
    // start the temp server on the port 880X to receive request token, once the token is recived, turn of the server
    this.http.get(Api.BUSINESS + '/' + business.id + '/calendar-access-request',
      (port: number) => {

        const url: string = GoogleCalendarUtil.getCalendarAccessUrl(googleClientId, port + '');
        setTimeout(() => {
            this.spinnerService.hide();
            window.open(url, '_self');
          },
          500);
      });
  }

  private loadGoogleClientId(callback?: (googleClientId: string) => void) {
    this.http.get(Api.CONFIG + '/google-client-id', (googleClientId: string) => {
        callback(googleClientId);
      },
      (error) => {
        console.log(error);
      },
      ResponseType.TEXT
    )
  }


}
