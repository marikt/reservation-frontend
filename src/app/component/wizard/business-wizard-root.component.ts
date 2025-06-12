import { HostListener, OnInit, Directive } from '@angular/core';
import {BroadcastService} from '../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Uploader} from '../../util/uploader';
import {AlertService} from '../../../../projects/notado-lib/src/lib/service/alert.service';
import {HttpService} from '../../../../projects/notado-lib/src/lib/service/http.service';
import {Subscription} from 'rxjs';


@Directive()
export class BusinessWizardRootComponent extends Uploader implements OnInit {

  public isMobile: boolean;
  public idx: number;
  public showValidation: boolean;
  private sub: Subscription;

  constructor(
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    super(alertService, broadcastService, http);

    this.sub = router.events.subscribe((val) => {
      // see also
      if (!(val instanceof NavigationEnd)) {
        return;
      }
      this.idx = Number(this.route.snapshot.params.idx);
    });
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public ngOnInit(): void {
    this.onResize();
  }

  public getNextIndex() {
    this.idx++;
    return Number(this.idx);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.sub.unsubscribe();
  }

}
