import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {IntroItemComponent} from '../intro-item/intro-item.component';

@Component({
  selector: 'app-faq-home',
  templateUrl: './faq-home.component.html',
  styleUrls: ['./faq-home.component.scss'],
  imports: [
    IntroItemComponent
  ],
  standalone: true
})
export class FaqHomeComponent implements OnInit {

  constructor(public languageService: LanguageService) {

  }

  ngOnInit(): void {
  }

}


