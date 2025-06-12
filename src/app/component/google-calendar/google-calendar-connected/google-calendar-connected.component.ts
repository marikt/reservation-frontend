import {Component} from '@angular/core';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';

@Component({
    selector: 'app-google-calendar-connected',
    templateUrl: './google-calendar-connected.component.html',
    styleUrls: ['./google-calendar-connected.component.scss'],
    standalone: true
})
export class GoogleCalendarConnectedComponent {

  constructor(
    public spinnerService: SpinnerService,
  ) {

  }

}
