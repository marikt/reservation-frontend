import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss'],
  imports: [
    IntroItemRevertComponent
  ],
  standalone: true
})
export class WhyUsComponent implements OnInit {

  public imgId: number = 0;

  constructor(public languageService: LanguageService,) {
  }

  ngOnInit(): void {
     }

}
