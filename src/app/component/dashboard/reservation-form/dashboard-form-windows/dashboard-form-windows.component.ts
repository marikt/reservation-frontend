import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {ResizeImageService} from '../../../../service/resize-image.service';
import {MetaService} from '../../../../service/meta.service';
import {Router} from '@angular/router';
import {ReservationWindowConfig} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window-config';
import {Server} from '../../../../../../projects/notado-lib/src/config/server';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {FormConfigService} from '../../../../service/form-config.service';
import {DashboardReservationCardComponent} from '../dashboard-reservation-card/dashboard-reservation-card.component';
import {DashboardFormConfigButtonComponent} from '../dashboard-form-config-button/dashboard-form-config-button.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-form-windows',
  templateUrl: './dashboard-form-windows.component.html',
  styleUrls: ['./dashboard-form-windows.component.scss'],
  imports: [
    DashboardReservationCardComponent,
    DashboardFormConfigButtonComponent,
    NgIf
  ],
  standalone: true
})
export class DashboardFormWindowsComponent implements OnInit {

    constructor(public dashboardService: DashboardService,
                public alertService: AlertService,
                public broadcastService: BroadcastService,
                public http: HttpService,
                public modalService: ModalService,
                public resizeImageService: ResizeImageService,
                public formConfigService: FormConfigService,
                public metaService: MetaService,
                private router: Router,
                public server: Server,
                public translate: TranslateService) {
    }

    ngOnInit(): void {

    }

    public showForm(): void {
        this.dashboardService.saveTemplate(() => this.router.navigate(['/form']));
    }

    public addPhoneInput(reservationWindow: ReservationWindow): void {
        if (!reservationWindow.config) {
            reservationWindow.config = new ReservationWindowConfig();
        }
        reservationWindow.config.phone = true;
    }

    public hideServicePrice(reservationWindow: ReservationWindow) {
        if (!reservationWindow.config) {
            reservationWindow.config = new ReservationWindowConfig();
        }
        reservationWindow.config.hidePrice = true;
    }

    public hideServiceDuration(reservationWindow: ReservationWindow) {
        if (!reservationWindow.config) {
            reservationWindow.config = new ReservationWindowConfig();
        }
        reservationWindow.config.hideDuration = true;
    }


}
