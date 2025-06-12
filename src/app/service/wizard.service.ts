import {Injectable} from '@angular/core';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {Router} from '@angular/router';
import {UserService} from '../../../projects/notado-lib/src/lib/security/service/user.service';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {AlertService} from '../../../projects/notado-lib/src/lib/service/alert.service';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {Business} from '../../../projects/notado-lib/src/lib/model/business';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';
import {Service} from '../../../projects/notado-lib/src/lib/model/service';
import {Worker} from '../../../projects/notado-lib/src/lib/model/worker';
import {Stack} from '../util/stack';
import {CONST} from '../../../projects/notado-lib/src/lib/util/const';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {LocalStorageService} from '../../../projects/notado-lib/src/lib/service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WizardService extends MySubscribable {

  public business: Business;
  public services: Service[] = [];
  public workers: Worker[] = [];
  public routesStack = new Stack<string>();
  public currentRoute: string;

  constructor(
    public http: HttpService,
    public router: Router,
    public userService: UserService,
    public broadcastService: BroadcastService,
    public alertService: AlertService,
    public localStorage: LocalStorageService
  ) {
    super(broadcastService);
    this.subscribe(Event.BUSINESSES_LOADED, (business: Business) => {
      this.business = business;

      this.http.get(Api.SERVICE + '/by-business/' + this.business.id, (services: Service[]) => {
        if (services && services.length > 0 && services[0]) {
          this.services[0] = services[0];
          this.services[0].name = '';
        }
      });

      this.http.get(Api.WORKER + '/by-business/' + this.business.id, (workers: Worker[]) => {
        if (workers && workers.length > 0 && workers[0]) {
          this.workers[0] = workers[0];
          this.workers[0].name = '';
        }
      });

      this.hideWizardForNextTime();
    });
  }

  public hideWizardForNextTime(): void {
    if (this.localStorage.get(CONST.NEW_USER)) {
      this.localStorage.remove(CONST.NEW_USER);
      this.business.url = '';
    }
  }

  public next(url: string) {
    url = 'wizard/' + url;
    this.routesStack.push(this.currentRoute);
    this.currentRoute = url;
    this.router.navigate([url]);
  }

  public back() {
    this.currentRoute = this.routesStack.pop();
    this.router.navigate([this.currentRoute]);
  }


}
