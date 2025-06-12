import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {DashboardButtonWixComponent} from '../dashboard-button-wix/dashboard-button-wix.component';
import {DashboardButtonWordpressComponent} from '../dashboard-button-wordpress/dashboard-button-wordpress.component';
import {DashboardButtonFacebookComponent} from '../dashboard-button-facebook/dashboard-button-facebook.component';
import {DashboardButtonWebnodeComponent} from '../dashboard-button-webnode/dashboard-button-webnode.component';
import {DashboardButtonWeeblyComponent} from '../dashboard-button-weebly/dashboard-button-weebly.component';
import {DashboardButtonSquarespaceComponent} from '../dashboard-button-squarespace/dashboard-button-squarespace.component';
import {DashboardButtonOtherComponent} from '../dashboard-button-other/dashboard-button-other.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard-button-cloud-platform',
  templateUrl: './dashboard-button-cloud-platform.component.html',
  styleUrls: ['./dashboard-button-cloud-platform.component.scss'],
  imports: [
    TranslateModule,
    FormsModule,
    NgSwitch,
    DashboardButtonWixComponent,
    DashboardButtonWordpressComponent,
    DashboardButtonFacebookComponent,
    DashboardButtonWebnodeComponent,
    DashboardButtonWeeblyComponent,
    DashboardButtonSquarespaceComponent,
    DashboardButtonOtherComponent,
    NgSwitchCase,
    RouterLink
  ],
  standalone: true
})
export class DashboardButtonCloudPlatformComponent implements OnInit {

    public platform: string = 'wix';

    constructor() {
    }

    ngOnInit() {
    }

}
