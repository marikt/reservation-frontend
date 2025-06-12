import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {NavigationStart, Router, RouterLink} from '@angular/router';
import {DashboardService} from '../../../../service/dashboard.service';
import {PaymentPlan} from '../../../../util/payment-plan';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuState} from '../../../util/menu-state';
import {Service} from '../../../../../../projects/notado-lib/src/lib/model/service';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {MySubscribable} from '../../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../../../../projects/notado-lib/src/lib/util/event.enum';
import {Business} from '../../../../../../projects/notado-lib/src/lib/model/business';
import {NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DashboardMenuBusinessComponent} from '../dashboard-menu-business/dashboard-menu-business.component';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import {DashboardMenuFormComponent} from '../dashboard-menu-form/dashboard-menu-form.component';
import {DashboardMenuOtherComponent} from '../dashboard-menu-other/dashboard-menu-other.component';
import {DashboardMenuSupportComponent} from '../dashboard-menu-support/dashboard-menu-support.component';

@Component({
  selector: 'app-dashboard-menu-vertical',
  templateUrl: './dashboard-menu-vertical.component.html',
  styleUrls: ['./dashboard-menu-vertical.component.scss'],
  animations: [
    trigger('subscriptionMenu', [
      // ...
      state('OPEN', style({
        margin: '23px 10px 23px -8px'
      })),
      state('CLOSE', style({
        margin: '23px 10px 23px -12px'
      })),
      transition('OPEN => CLOSE', [
        animate('0.3s')
      ]),
      transition('CLOSE => OPEN', [
        animate('0.3s')
      ]),
    ]),
    trigger('popupMenu', [
      state('OPEN', style({
        opacity: 1
      })),
      state('CLOSE', style({
        opacity: 0
      })),
      transition('OPEN => CLOSE', [
        animate('0.2s')
      ]),
      transition('CLOSE => OPEN', [
        animate('0.2s')
      ]),
    ]),
  ],
  imports: [
    RouterLink,
    NgIf,
    TranslateModule,
    DashboardMenuBusinessComponent,
    NgbCollapse,
    DashboardMenuFormComponent,
    DashboardMenuOtherComponent,
    DashboardMenuSupportComponent
  ],
  standalone: true
})
export class DashboardMenuVerticalComponent extends MySubscribable implements OnInit {

    public services: Service[];
    public subscriptionMenuCollapsed: boolean = true;
    public businessMenuCollapsed: boolean = true;
    public formMenuCollapsed: boolean = true;
    public profileMenuCollapsed: boolean = true;
    public otherMenuCollapsed: boolean = true;
    public supportMenuCollapsed: boolean = true;
    public route: string = '';

    constructor(
        public userService: UserService,
        public router: Router,
        public dashboardService: DashboardService,
        public http: HttpService,
        public broadcastService: BroadcastService
    ) {
        super(broadcastService);
        this.subscribe(Event.BUSINESSES_LOADED, (business: Business) => {
            this.loadServices(business.id);
        });
    }

    public ngOnInit(): void {
        if (this.dashboardService.business) {
            this.loadServices(this.dashboardService.business.id);
        }

        this.router.events.subscribe(
            (evt) => {
                if (evt instanceof NavigationStart) {
                    this.route = evt.url;
                    if (this.route === '/') {
                        this.route = '/intro';
                    }

                    this.businessMenuCollapsed = true;
                    this.formMenuCollapsed = true;
                    this.profileMenuCollapsed = true;
                    this.otherMenuCollapsed = true;
                    this.supportMenuCollapsed = true;
                }
            });
    }


    private loadServices(businessId: number) {
        this.http.get(Api.SERVICE + '/by-business/' + this.dashboardService.business.id,
            (services: Service[]) => {
                this.services = services;
            });
    }

    public get paymentPlan(): typeof PaymentPlan {
        return PaymentPlan;
    }

    public get menuStateEnum(): typeof MenuState {
        return MenuState;
    }

}
