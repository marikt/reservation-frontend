import {Component} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-try-button',
  templateUrl: './try-button.component.html',
  styleUrls: ['./try-button.component.scss'],
  imports: [
    TranslateModule,
    RouterLink
  ],
  standalone: true
})
export class TryButtonComponent {

  constructor(public languageService: LanguageService) {
  }

}


