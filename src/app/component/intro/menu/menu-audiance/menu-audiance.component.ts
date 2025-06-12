import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {RouterLink} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-menu-audiance',
  templateUrl: './menu-audiance.component.html',
  styleUrls: ['./menu-audiance.component.scss'],
  imports: [
    RouterLink,
    TranslateModule
  ],
  standalone: true
})
export class MenuAudianceComponent implements OnInit {

  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
  }

}
