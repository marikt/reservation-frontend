import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../model/user';
import {BroadcastService} from '../../service/broadcast.service';
import {Event} from '../../util/event.enum';
import {Api} from '../../enum/api';
import {HttpService} from '../../service/http.service';
import {MySubscribable} from '../../util/my-subscribable';
import {CONST} from '../../util/const';
import {LocalStorageService} from '../../service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends MySubscribable {

  public user: User;

  constructor(
    private http: HttpService,
    public broadcastService: BroadcastService,
    public router: Router,
    private localStorage: LocalStorageService,
  ) {
    super(broadcastService);

    this.subscribe(Event.LOGOUT, () => this.user = null);

    this.subscribe(Event.LOGIN,
      () => {
        this.loadUser();
      });
  }

  /**
   * User has all required parameters
   *
   */
  public static validateUserAccount(user: User): boolean {
    if (user && user.email) {
      return true;
    }
    return false;
  }

  /**
   * Check if the user has filled mandatory properties for sending invoice
   */
  public hasInvoiceData(): boolean {

    if (!this.user) {
      return false;
    }

    if (this.user.name) {
      return true;
    }
    return false;
  }

  public create(): void {

    if (!this.user) {
      console.warn('The user is null!');
      return;
    }
    this.http.post(Api.USER, this.user, (user: User) => this.user = user);
  }

  public update(user?: User, callback?: (data?: any) => void): void {

    if (user) {
      this.http.put(Api.USER + '/' + user.id, user, (user: User) => {
        this.user = user;
        callback(user);
      });
      return;
    }

    if (!this.user) {
      console.warn('The user is null!');
      return;
    }

    this.http.put(Api.USER + '/' + this.user.id, this.user, (user: User) => {
      this.user = user;
      callback(user);
    });
  }

  private loadUser(): void {

    const userId: string = this.localStorage.get(CONST.USER_ID);
    this.http.get(Api.USER + '/' + userId,
      (user: User) => {
        this.user = user;
        this.fire(Event.USER_LOADED, user);
      }
    );
  }

}
