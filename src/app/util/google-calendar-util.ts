import {environment} from '../environments/environment';
import {Env} from '../../../projects/notado-lib/src/lib/enum/env';

export class GoogleCalendarUtil {
  private static CALENDAR_ACCESS_URL: string = 'https://accounts.google.com/o/oauth2/auth?access_type=offline&approval_prompt=force&client_id=';
  private static CALENDAR_ACCESS_URL_POSTFIX: string = '/Callback&response_type=code&';
  private static SCOPE: string = 'scope=https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/contacts'

  public static getCalendarAccessUrl(clientId: string, port: string): string {
    // let clientId = environment.environment == Env.DEV ? GoogleCalendarUtil.CLIENT_ID_DEV : GoogleCalendarUtil.CLIENT_ID_PROD;
    let envUrl;
    if (environment.environment === Env.DEV) {
      envUrl = 'http://localhost:';
    } else if (environment.environment === Env.TEST ||
      window.location.origin.includes('test-notado.eu')) {
      envUrl = 'https://www.test-notado.eu:';
    } else {
      envUrl = 'https://www.notado.cz:';
    }
    const clientAndRedirect = clientId + '&redirect_uri=' + envUrl;
    return GoogleCalendarUtil.CALENDAR_ACCESS_URL + clientAndRedirect + port + GoogleCalendarUtil.CALENDAR_ACCESS_URL_POSTFIX + GoogleCalendarUtil.SCOPE;
  }
}
