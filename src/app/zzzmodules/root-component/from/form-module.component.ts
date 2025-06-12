import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {Router, RouterOutlet} from '@angular/router';
import {FormService} from '../../../../../projects/notado-lib/src/lib/service/form.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';

@Component({
  selector: 'app-form-module',
  templateUrl: './form-module.component.html',
  styleUrls: ['./form-module.component.scss'],
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class FormModuleComponent implements OnInit {

  constructor(
    public languageService: LanguageService,
    public formService: FormService,
    private router: Router,
    public broadcastService: BroadcastService,
  ) {
    const url = this.router.url;
    setTimeout(() => {
      if (url.includes('form-service-selected') ||
        url.includes('form-service-group-selected') ||
        url.includes('form-date-selected') ||
        url.includes('form-course-selected') ||
        url.includes('form-custom') ||
        url.includes('form-date')) {
        // let it automatically redirect from form-service-selected component
      } else if (
        url.includes('calendar-availability') ||
        url.includes('form-thanks-paid') ||
        url.includes('form-paid-error')) {
      } else if (this.formService.reservationForSpecificItem) {
      } else {
        this.formService.openReservationFormForProduction();
      }
    }, 600);
  }

  ngOnInit() {
    this.languageService.initLanguage();
  }

}
