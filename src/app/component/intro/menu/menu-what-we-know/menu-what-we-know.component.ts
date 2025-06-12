import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {RouterLink} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-menu-what-we-know',
  templateUrl: './menu-what-we-know.component.html',
  styleUrls: ['./menu-what-we-know.component.scss'],
  imports: [
    RouterLink,
    TranslateModule
  ],
  standalone: true
})
export class MenuWhatWeKnowComponent implements OnInit {



  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {

  }

}

