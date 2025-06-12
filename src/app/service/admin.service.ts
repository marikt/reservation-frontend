import {Injectable} from '@angular/core';
import {User} from '../../../projects/notado-lib/src/lib/model/user';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public users: User[] = [];

  constructor(
    public http: HttpService,
  ) {
  }

  public loadUsers(): void {
    this.http.get(Api.USER, (users: User[]) => {
      this.users = users;
    });
  }

  public loadActiveUsers(): void {
    this.http.get(Api.USER + '/active', (users: User[]) => {
      this.users = users;
    });
  }

}
