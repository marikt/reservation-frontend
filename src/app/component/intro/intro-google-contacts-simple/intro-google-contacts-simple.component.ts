import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {IntroItemComponent} from '../intro-item/intro-item.component';

@Component({
  selector: 'app-intro-google-contacts-simple',
  templateUrl: './intro-google-contacts-simple.component.html',
  styleUrls: ['./intro-google-contacts-simple.component.scss'],
  imports: [
    IntroItemComponent
  ],
  standalone: true
})
export class IntroGoogleContactsSimpleComponent implements OnInit {

  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {
  }

}
