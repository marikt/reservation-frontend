import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {BusinessBranchMax} from '../../../../../projects/notado-lib/src/lib/model/business-branch-max';
import {MetaService} from '../../../service/meta.service';
import {BusinessBranch} from '../../../../../projects/notado-lib/src/lib/model/business-branch';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-business-branch',
  templateUrl: './dashboard-business-branch.component.html',
  styleUrls: ['./dashboard-business-branch.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule,
    FormsModule,
    NgForOf,
    RouterLink,
    NgbTooltip,
    NgIf
  ],
  standalone: true
})
export class DashboardBusinessBranchComponent implements OnInit {

    public businessBranches: BusinessBranch[];

    constructor(
        public dashboardService: DashboardService,
        public http: HttpService,
        public router: Router,
        public alertService: AlertService,
        public metaService: MetaService,
        public server: Server,
    ) {
    }

    ngOnInit() {
        this.http.get(Api.BUSINESS_BRANCH + '/by-business/' + this.dashboardService.business.id,
            (businessBranches: BusinessBranch[]) => {
                this.businessBranches = businessBranches;
            });
    }

    public addBusinessBranch(): void {
        const businessBranch: BusinessBranchMax = new BusinessBranchMax();
        businessBranch.businessId = this.dashboardService.business.id;
        this.http.post(Api.BUSINESS_BRANCH, businessBranch, (createdBusinessBranch) => {
            this.router.navigate(['/dashboard/dashboard-business-branch-item', createdBusinessBranch.id]);
        })
    }

}
