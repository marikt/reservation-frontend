import {Component, OnInit} from '@angular/core';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-intro-google-contacts',
  templateUrl: './intro-google-contacts.component.html',
  styleUrls: ['./intro-google-contacts.component.scss'],
  imports: [
    IntroItemRevertComponent,
    TranslateModule
  ],
  standalone: true
})
export class IntroGoogleContactsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
