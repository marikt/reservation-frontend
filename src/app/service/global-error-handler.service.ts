import {ErrorHandler, Injectable} from '@angular/core';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {Server} from '../../../projects/notado-lib/src/config/server';
import {Env} from '../../../projects/notado-lib/src/lib/enum/env';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private ignoredErrors: string[] = [];
  private ignoredDomains: string[] = [];


  constructor(
    private http: HttpService,
    public server: Server,
  ) {
    this.ignoredErrors[0] = 'ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: \'false\'. Current value: \'true\'.';
    this.ignoredErrors[1] = 'ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value for \'is-valid\': \'true\'. Current value: \'false\'.';
    this.ignoredErrors[2] = 'ctx_r45.fileOver is not a function';

    this.ignoredDomains[0] = 'https://jeduvklidu-cz.notado.cz';

  }

  public handleError(error) {
    try {
      for (const ignoreError of this.ignoredErrors) {
        if (error.message === ignoreError) {
          return
        }
      }
      for (const ignoreDomain of this.ignoredDomains) {
        if (error.stack && error.stack.include(ignoreDomain)) {
          return;
        }
      }

      const myError = {
        message: error.message,
        stack: error.stack
      };
      console.error(myError.message);
      console.error(myError.stack);

      if (this.server.environment === Env.PRODUCTION) {
        this.http.post(Api.ERROR, myError, () => {
        });
      }
    } catch (e) {
      // ignore
    }
  }

}
