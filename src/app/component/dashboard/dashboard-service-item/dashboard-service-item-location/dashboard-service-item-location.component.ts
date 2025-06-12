import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router} from '@angular/router';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {DashboardServiceItemCommonComponent} from '../dashboard-service-item-common.component';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {VideoTutorialComponent} from '../../../video-tutorial/video-tutorial.component';
import {SafeUrlPipe} from '../../../../pipe/safe-url.pipe';
import {LineService} from '../../../../service/line.service';
import {ServiceService} from '../../../../service/service.service';

@Component({
  selector: 'app-dashboard-service-item-location',
  templateUrl: './dashboard-service-item-location.component.html',
  styleUrls: ['./dashboard-service-item-location.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    NgIf,
    VideoTutorialComponent,
    SafeUrlPipe
  ],
  standalone: true
})
export class DashboardServiceItemLocationComponent extends DashboardServiceItemCommonComponent implements OnInit {

  public location: string;
  public customLocation: boolean;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public http: HttpService,
    public router: Router,
    public broadcastService: BroadcastService,
    public modalService: ModalService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public preventDoubleClickService: PreventDoubleClickService,
    public lineService: LineService,
    public serviceService: ServiceService
  ) {
    super(
      dashboardService,
      alertService,
      broadcastService,
      http,
      router,
      modalService,
      translate,
      preventDoubleClickService,
      lineService,
      serviceService);
  }

  ngOnInit() {
    if (this.service.location) {
      this.location = this.service.location;
      this.customLocation = true;
    } else {
      this.customLocation = false;
    }
  }

  public setBusinessLocation() {
    if (this.location && this.location.includes('<iframe')) {
      this.location = this.extractSrcFromIframe(this.location);
    }
    this.service.location = this.location;
  }

  private extractSrcFromIframe(iframeHtml: string): string | null {
    const regex = /<iframe.*?src="(.*?)".*?><\/iframe>/;
    const match = iframeHtml.match(regex);
    return match ? match[1] : null;
  }

}
