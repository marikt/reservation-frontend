import {Component} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-reservation-module',
  templateUrl: './reservation-module.component.html',
  styleUrls: ['./reservation-module.component.scss'],
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class ReservationModuleComponent {


  constructor(
    public languageService: LanguageService
  ) {
    this.languageService.initLanguage();
  }

}
