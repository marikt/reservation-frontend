import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {SecurityUser} from '../model/security-user';
import {HttpUtil} from '../../util/http-util';
import {SecureApi} from '../util/secure-api';
import {BroadcastService} from '../../service/broadcast.service';
import {Event} from '../../util/event.enum';
import {HttpClient} from '@angular/common/http';
import {MySubscribable} from '../../util/my-subscribable';
import {CONST} from '../../util/const';
import {HttpStatus} from '../../util/http-status';
import {SpinnerService} from '../../service/spinner.service';
import {Server} from '../../../config/server';
import {LanguageService} from '../../service/language.service';
import {LocalStorageService} from '../../service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends MySubscribable {

  private static REMEMBER_ME_KEY = 'remember-me';

  public user: SecurityUser;

  constructor(
    public http: HttpClient, // keep Http here, SecureHttpService will cause cyclic dependency
    public router: Router,
    public broadcastService: BroadcastService,
    private localStorage: LocalStorageService,
    public spinnerService: SpinnerService,
    public server: Server,
    public httpUtil: HttpUtil,
    public languageService: LanguageService,
  ) {
    super(broadcastService);
  }

  public isAuthenticated(): boolean {
    if (this.user) {
      return true;
    }
    return false;
  }

  /**
   * check from the backend using if we can login with remember me cookie
   */
  public loadUser(): void {
    this.spinnerService.show();
    this.http
      .get(this.server.SERVER + SecureApi.GET_SECURE_USER,
        {
          observe: 'response',
          withCredentials: true
        },
      ).pipe(
      map(
        response => {
          return response.body
        }
      ))
      .subscribe(
        data => {
          this.spinnerService.hide();

          if (data) {
            this.user = <SecurityUser>data;
            this.localStorage.set(CONST.USER_ID, this.user.id);
            this.fire(Event.LOGIN);
          }
        },
        error => {
          this.spinnerService.hide();
          console.log(error);
        }
      );

  }

  /**
   * Join the user
   *
   * if user does not exist create new one
   *
   * login into backend
   */
  public signup(user: SecurityUser, erroCallback?: (data?: any) => void): void {
    user.email = user.email.toLowerCase();
    user.language = this.languageService.language;
    this.http
      .post(
        this.server.SERVER + SecureApi.SIGNUP,
        user,
        {
          headers: {'Content-Type': 'application/json'},
          observe: 'response',
          withCredentials: true
        }
      ).pipe(
      map(
        response => response.status
      ))
      .subscribe(
        status => {
          // accepted, user already exists
          if (status === HttpStatus.CREATED) { // created
            this.login(user);
          } else {
            erroCallback(status);
            console.log('Unexpected status ' + status + ' while creating user ' + user.email);
          }

        }
      )
  }

  public logout(): void {
    this.localStorage.remove(CONST.USER_ID);
    this.fire(Event.LOGOUT);
    this.user = null;

    this.http
      .post(this.server.SERVER + SecureApi.LOGOUT, {}, {
        headers: this.httpUtil.postHeader(),
        observe: 'response',
        withCredentials: true
      }).pipe(
      map(resp => resp))
      .subscribe(data => {
        }
      );
  }

  public login(user: SecurityUser,
               errorCallback?: (data?: any) => void): void {
    user.email = user.email.toLowerCase();

    const headers: any = {'Content-Type': 'application/x-www-form-urlencoded'};

    const data: string = 'username=' + user.email +
      '&password=' + encodeURIComponent(user.password) +
      '&submit=Login';
    this.http
      .post(this.server.SERVER + SecureApi.LOGIN, data, {
        headers: headers,
        observe: 'response',
        withCredentials: true
      })
      .subscribe({
        next: (response) => {
          this.loadUser();
        },
        error: (error) => {
          if (errorCallback) {
            errorCallback(error);
          }
        }
      });
  }

}
