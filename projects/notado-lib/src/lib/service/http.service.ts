import {HttpUtil} from '../util/http-util';
import {Injectable} from '@angular/core';
import {AuthService} from '../security/service/auth.service';
import {AlertService} from './alert.service';
import {SpinnerService} from './spinner.service';
import {Router} from '@angular/router';
import {StringUtil} from '../util/string-util';
import {Error} from '../util/error';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseType} from '../enum/response-type.enum';
import {Env} from '../enum/env';
import {Server} from '../../config/server';
import {ErrorResponse} from '../util/error-response';
import {LanguageService} from './language.service';
import {TranslateService} from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertService: AlertService,
    public spinnerService: SpinnerService,
    public router: Router,
    public server: Server,
    public languageService: LanguageService,
    private translate: TranslateService,
    public httpUtil: HttpUtil
  ) {
  }

  /**
   * GET
   */
  public getWithSpinner(url: string,
                        callback?: (data?: any) => void,
                        errorCallback?: (data?: HttpErrorResponse) => void,
                        responseType?: ResponseType): void {
    url = this.server.SERVER + url;
    this.spinnerService.show();
    let observable: Observable<any>;
    if (responseType as ResponseType === ResponseType.TEXT) {
      observable = this.getText(url);
    } else {
      observable = this.getJson(url);
    }

    // this.http.get(url, {
    //   headers: HttpUtil.getHeader,
    //   observe: 'response',
    //
    //   withCredentials: this.serverConfig.developmenttMode
    // })
    observable.subscribe(
      responseData => {
        this.handleResponse(callback, responseData.body);
        this.spinnerService.hide();

      },
      (error: HttpErrorResponse) => {
        this.handleError(error, errorCallback);
        this.spinnerService.hide();

      }
    );

  }

  public get(url: string,
             callback?: (data?: any) => void,
             errorCallback?: (data?: HttpErrorResponse) => void,
             responseType?: ResponseType): void {
    url = this.server.SERVER + url;
    let observable: Observable<any>;
    if (responseType as ResponseType === ResponseType.TEXT) {
      observable = this.getText(url);
    } else {
      observable = this.getJson(url);
    }
    observable.subscribe(
      responseData => {
        this.handleResponse(callback, responseData.body);
      },
      (error: HttpErrorResponse) => {
        this.handleError(error, errorCallback);
      }
    );

  }

  public getBlob(url: string, callback: (data?: any) => void, filename: string) {
    url = this.server.SERVER + url; // Assuming `this.server.SERVER` is defined somewhere
    const observable: Observable<any> = this.http.get(url, {
      headers: new HttpHeaders({'Content-Type': 'application/octet-stream'}), // Generic header for binary files
      observe: 'response',
      responseType: 'blob', // Handle binary data
      withCredentials: true
    });

    observable.subscribe(
      responseData => {
        this.handleBlobResponse(callback, responseData.body, filename);
      },
      (error: HttpErrorResponse) => {
        console.error('File download error:', error);
      }
    );
  }

  // Handle response and trigger download with the original filename
  private handleBlobResponse(callback: (data?: any) => void,
                             blobData: Blob,
                             filename: string) {
    const fileURL = window.URL.createObjectURL(blobData);
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = filename; // Use the original filename from the response
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Run callback if provided
    if (callback) {
      callback(blobData);
    }
  }

  getPdf(url: string, callback?: (data?: any) => void) {
    url = this.server.SERVER + url;
    const observable: Observable<any> = this.http.get(url, {
      headers: {'Content-Type': 'application/pdf'},
      observe: 'response',
      responseType: 'blob',
      withCredentials: true
    });
    observable.subscribe(
      responseData => {
        this.handleResponse(callback, responseData.body);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public getCsv(url: string, callback?: (data?: any) => void) {
    url = this.server.SERVER + url;
    const observable: Observable<any> = this.http.get(url, {
      headers: {'Content-Type': 'text/csv'},
      observe: 'response',
      responseType: 'blob',
      withCredentials: true
    });
    observable.subscribe(
      responseData => {
        this.downloadFile(responseData);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  /**
   * POST
   */
  public postWithSpinner(url: string, data: any, callback?: (data?: any) => void, errorCallback?: (data?: HttpErrorResponse) => void): void {
    url = this.server.SERVER + url;

    this.spinnerService.show();

    this.http.post(url, data,
      {
        headers: this.httpUtil.postHeader(),
        observe: 'response',
        withCredentials: true
      })
      .subscribe(
        responseData => {
          this.handleResponse(callback, responseData.body);
          this.spinnerService.hide();

        },
        (error: HttpErrorResponse) => {
          this.handleError(error, errorCallback);
          this.spinnerService.hide();

        }
      );
  }

  public post(url: string,
              data: any,
              callback?: (data?: any) => void,
              errorCallback?: (data?: HttpErrorResponse) => void): void {
    url = this.server.SERVER + url;

    this.http.post(url, data,
      {
        headers: this.httpUtil.postHeader(),
        observe: 'response',
        withCredentials: true
      })
      .subscribe(
        responseData => {
          this.handleResponse(callback, responseData.body);
        },
        (error: HttpErrorResponse) => {
          this.handleError(error, errorCallback);
        }
      );
  }

  /**
   * POST FILE
   */
  public postFile(url: string, file: any, callback?: (data?: any) => void, errorCallback?: (data?: HttpErrorResponse) => void): void {
    url = this.server.SERVER + url;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post(url, formData,
      {
        // headers: new HttpHeaders({'Content-Type': 'multipart/form-data'}),
        observe: 'response',
        withCredentials: true
      })
      .subscribe(
        responseData => {
          this.handleResponse(callback, responseData.body);
        },
        (error: HttpErrorResponse) => {
          this.handleError(error, errorCallback);
        }
      );
  }

  /**
   * PUT
   */
  public put(url: string,
             data: any,
             callback?: (data?: any) => void,
             errorCallback?: (data?: any) => void): void {
    url = this.server.SERVER + url;
    this.http.put(url, data,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'}),
        observe: 'response',
        withCredentials: true
      })
      .subscribe(
        responseData => {
          this.handleResponse(callback, responseData.body);
        },
        (error: HttpErrorResponse) => {
          this.handleError(error, errorCallback);
        }
      );
  }

  public putWithSpinner(url: string,
                        data: any,
                        callback?: (data?: any) => void,
                        errorCallback?: (data?: any) => void,): void {
    url = this.server.SERVER + url;
    this.spinnerService.show();
    this.http.put(url, data,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'}),
        observe: 'response',
        withCredentials: true
      })
      .subscribe(
        responseData => {
          this.handleResponse(callback, responseData.body);
          this.spinnerService.hide();

        },
        (error: HttpErrorResponse) => {
          this.handleError(error, errorCallback);
          this.spinnerService.hide();

        }
      );
  }

  public delete(url: string, callback?: (data?: any) => void, errorCallback?: (data?: any) => void, responseType?: ResponseType): void {
    url = this.server.SERVER + url;
    this.http.delete(url,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'}),
        observe: 'response',
        withCredentials: true
      })
      .subscribe(
        responseData => {
          if (callback) {
            callback(responseData.body);
          } else {
            this.alertService.addSuccessToast('Success');
          }
        },
        (error: HttpErrorResponse) => {
          this.handleError(error, errorCallback);
        }
      );
  }

  private handleResponse(callback: (data?: any) => void, data) {
    if (callback) {
      callback(data);
    } else if (this.server.environment !== Env.PRODUCTION) {
      this.alertService.addSuccessToast('Success');
    }

  }

  private getText(url: string): Observable<HttpResponse<string>> {
    return this.http.get(url, {
      headers: this.httpUtil.getHeader(),
      observe: 'response',
      responseType: 'text',
      withCredentials: true
    })
  }

  private getJson(url: string): Observable<HttpResponse<any>> {

    return this.http.get(url, {
      headers: this.httpUtil.getHeader(),
      observe: 'response',
      responseType: 'json',
      withCredentials: true
    })
  }

  private handleError(error: HttpErrorResponse, errorCallback: (data?: any) => void) {
    if (!errorCallback) {
      this.generalErrorHandle(error);
    } else if (errorCallback) {
      errorCallback(error);
    } else if (this.server.environment !== Env.PRODUCTION) {
      this.alertService.addErrorToast('Error:' + error.message);
      console.log(error);
    }
  }

  private generalErrorHandle(errorResponse: HttpErrorResponse): void {

    this.spinnerService.hideAll();

    const error: ErrorResponse = errorResponse.error;
    const errorStatus: number = error.status;

    const errorCode: string = StringUtil.removeInnerQuotation(error.code);

    if (errorStatus === 401) {
      this.router.navigate([this.languageService.language + '/intro']);
    }

    switch (errorCode) {
      case Error.FILE_TO_BIG:
        break;
      case Error.UNSUPPORTER_EXTENSION:
        break;
      case Error.EMAIL_ERROR:
        this.alertService.addError(this.translate.instant('ALERT.EMAIL_ERROR'));
        break;
      case Error.MISSING_DATA:
        this.alertService.addError(this.translate.instant('ALERT.STRIPE_INTEGRATION_ERROR'));
        break;
      case Error.BUSINESS_URL_REQUIRED:
        this.alertService.addWarning(this.translate.instant('ALERT.BUSINESS_URL_REQUIRED'));
        break;
      case Error.FORGOTTEN_PASSWORD_UNKNOWN_EMAIL:
        this.alertService.addWarning(this.translate.instant('ALERT.FORGOTTEN_PASSWORD_UNKNOWN_EMAIL'));
        break;
      case Error.FORGOTTEN_PASSWORD_GOOGLE_SIGNUP:
      case Error.FORGOTTEN_PASSWORD_FACEBOOK_SIGNUP:
        this.alertService.addInfo(this.translate.instant('ALERT.FORGOTTEN_PASSWORD_GOOGLE_SIGNUP'));
        break;

      case Error.GENERAL_ERROR:
      case Error.DATABASE_ERROR:
        this.router.navigate(['general-error']);
        break;
    }
  }

  private downloadFile(data: Response): void {
    // @ts-ignore
    const byteArray = new Uint8Array(data);
    // use byteArray, otherwise there will be [Object object] in csv file
    const blob = new Blob([byteArray], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
