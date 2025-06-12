import {Component, OnInit} from '@angular/core';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-google-calendar-fail',
    templateUrl: './google-calendar-fail.component.html',
    styleUrls: ['./google-calendar-fail.component.scss'],
    standalone: true
})
export class GoogleCalendarFailComponent implements OnInit {

  constructor(public spinnerService: SpinnerService,
              public translate: TranslateService
  ) {
  }


  ngOnInit() {
    this.spinnerService.show(this.translate.instant('LOADING.CONNECTION_TO_CALENDAR_FAILED'), 'far fa-sad-cry');
    setTimeout(() => {
        this.spinnerService.hide();
      },
      4000);

    // this.alertService.addSuccess('S google kalendářem jste byli úspěšně propojeni.')
  }

}
