import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {DemoService} from '../../../../service/demo.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-what-we-know',
  templateUrl: './what-we-know.component.html',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./what-we-know.component.scss']
})
export class WhatWeKnowComponent implements OnInit {

  public whatWeKnowItems: WhatWeKnowItem[] = [];

  constructor(public languageService: LanguageService,
              public demoService: DemoService,) {
  }

  ngOnInit(): void {
    this.whatWeKnowItems.push(
      new WhatWeKnowItem(
        'far fa-calendar-check',
        'MENU_WHAT_WE_KNOW.RESERVATION_CONFIG',
        'MENU_WHAT_WE_KNOW.RESERVATION_CONFIG_DESC',
        '/intro/' + this.languageService.language + '/online-reservation'
        ));

    this.whatWeKnowItems.push(
      new WhatWeKnowItem(
        'fab fa-google',
        'MENU_WHAT_WE_KNOW.GOOGLE',
        'MENU_WHAT_WE_KNOW.GOOGLE_DESC',
        '/intro/' + this.languageService.language + '/management-on-google'
        ));

    this.whatWeKnowItems.push(
      new WhatWeKnowItem(
        'fas fa-users',
        'MENU_WHAT_WE_KNOW.CUSTOMER',
        'MENU_WHAT_WE_KNOW.CUSTOMER_DESC',
        '/intro/' + this.languageService.language + '/intro-google-contacts'
        ));

    this.whatWeKnowItems.push(
      new WhatWeKnowItem(
        'far fa-comment-dots',
        'MENU_WHAT_WE_KNOW.NOTIFICATION',
        'MENU_WHAT_WE_KNOW.NOTIFICATION_DESC',
        '/intro/' + this.languageService.language + '/notification'
        ));

    this.whatWeKnowItems.push(
      new WhatWeKnowItem(
        'fas fa-plug',
        'MENU_WHAT_WE_KNOW.INTEGRATE',
        'INTRO.INTEGRATION.LABEL2',
        '/intro/' + this.languageService.language + '/integration'
        ));

  }
}

export class WhatWeKnowItem {
  public icon: string;
  public label: string;
  public description: string;
  public link: string;

  public constructor(icon: string, label: string, description: string, link: string) {
    this.icon = icon;
    this.label = label;
    this.description = description;
    this.link = link;
  }

}
