import {Component} from '@angular/core';
import {IntroItemComponent} from '../intro-item/intro-item.component';
import {TranslateModule} from '@ngx-translate/core';
import {WhatWeKnowListItemComponent} from '../what-we-know-list-item/what-we-know-list-item.component';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-intro-item-revert',
  templateUrl: './intro-item-revert.component.html',
  styleUrls: ['../intro-item/intro-item.component.scss'],
  imports: [
    TranslateModule,
    WhatWeKnowListItemComponent,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class IntroItemRevertComponent extends IntroItemComponent {

  ngOnInit(): void {
  }

}

