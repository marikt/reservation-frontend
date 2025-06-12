import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {Device} from '../../../../../projects/notado-lib/src/lib/model/device';
import {MetaService} from '../../../service/meta.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-device',
  templateUrl: './dashboard-device.component.html',
  styleUrls: ['./dashboard-device.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    TranslateModule,
    NgForOf,
    RouterLink,
    NgIf,
    NgbTooltip
  ],
  standalone: true
})
export class DashboardDeviceComponent implements OnInit {
  public devices: Device[];

  constructor(
    public dashboardService: DashboardService,
    public http: HttpService,
    public router: Router,
    public alertService: AlertService,
    public metaService: MetaService,
    public server: Server
  ) {
  }

  ngOnInit() {
    this.http.get(Api.DEVICE + '/by-business/' + this.dashboardService.business.id, (devices: Device[]) => {
      this.devices = devices;
    });
  }

  public addDevice() {
    const device: Device = new Device();
    device.businessId = this.dashboardService.business.id;
    this.http.post(Api.DEVICE, device, (createdDevice: Device) => {
      this.router.navigate(['/dashboard/dashboard-device-item', createdDevice.id]);
    });
  }

}
