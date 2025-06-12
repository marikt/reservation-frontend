import {Injectable} from '@angular/core';
import {DashboardService} from './dashboard.service';
import {CustomFieldForService} from '../../../projects/notado-lib/src/lib/model/reservation-form/custom-field-for-service';
import {ReservationWindowConfig} from '../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window-config';
import {FormWindowName} from '../../../projects/notado-lib/src/lib/util/form-window-name';
import {ReservationWindow} from '../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {Service} from '../../../projects/notado-lib/src/lib/model/service';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {AlertService} from '../../../projects/notado-lib/src/lib/service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService extends MySubscribable {

  public windowIdx: number;
  public window: ReservationWindow;
  public serviceForCustomWindow: Service;
  public customFieldForService: CustomFieldForService = new CustomFieldForService();
  public hover: boolean = false;
  public showBackground: boolean = true;

  constructor(public dashboardService: DashboardService,
              public http: HttpService,
              public broadcastService: BroadcastService,
              public alertService: AlertService
  ) {
    super(broadcastService);
    this.init(0);
    this.subscribe(Event.BUSINESSES_LOADED, () => {
      setTimeout(() => {
        this.serviceForCustomWindow = null;
        this.init(0);
      }, 1300);
    });
  }

  public refreshBackground(): void {
    this.showBackground = false;
    setTimeout(() => {
      this.showBackground = true;
    }, 100)
  }

  public init(idx: number): void {
    if (this.serviceForCustomWindow) {
      this.doInit(idx);
    } else {
      this.http.get(Api.SERVICE + '/first-service-simple-by-business-id/' + this.dashboardService.business.id,
        (service: Service) => {
          this.serviceForCustomWindow = service;
          this.doInit(idx);
        });
    }
    this.window = this.dashboardService.template.windows[idx];
    this.windowIdx = idx;
  }

  public registerHover() {
    setTimeout(() => {
      const previewContainer = document.getElementById('preview-container');
      if (previewContainer) {
        previewContainer.addEventListener('mouseenter',
          (event) => {
            this.hover = true;
            console.log('mouseenter')
          }
        );
        previewContainer.addEventListener('mouseleave', () => this.hover = false);
      } else {
        console.warn('cant register previewContainer');
      }

      const previewWindow = document.getElementById('preview-window');
      if (previewWindow) {
        previewWindow.addEventListener('mouseenter',
          (event) => {
            this.hover = true;
            console.log('mouseenter')
          }
        );
        previewWindow.addEventListener('mouseleave', () => this.hover = false);
      } else {
        console.warn('cant register previewWindow');
      }
    }, 200);
  }

  public doInit(idx: number): void {
    for (const window of this.dashboardService.template.windows) {
      if (window.name === FormWindowName.CUSTOM) {
        this.setCustomFieldsForService(window);
        break;
      }
    }
    this.window = this.dashboardService.template.windows[idx];
    this.windowIdx = idx;
  }

  public setCustomFieldsForService(reservationWindow: ReservationWindow) {
    if (!reservationWindow.config) {
      reservationWindow.config = new ReservationWindowConfig();
    }
    if (!reservationWindow.config.customFieldsForServices) {
      reservationWindow.config.customFieldsForServices = [];
    }
    this.customFieldForService = this.getCustomFieldsForService(reservationWindow.config.customFieldsForServices);
  }

  private getCustomFieldsForService(customFieldsForService: CustomFieldForService[]): CustomFieldForService {
    if (customFieldsForService.length > 0) {
      // tslint:disable-next-line:no-shadowed-variable
      for (const cfForService of customFieldsForService) {
        if (cfForService.serviceId === this.serviceForCustomWindow.id) {
          return cfForService;
        }
      }
    }

    const cfForService = new CustomFieldForService();
    cfForService.serviceId = this.serviceForCustomWindow.id;
    cfForService.customFields = [];
    customFieldsForService.push(cfForService);
    return cfForService;
  }
}
