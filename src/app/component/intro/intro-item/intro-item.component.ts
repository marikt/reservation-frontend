import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {WhatWeKnowListItemComponent} from '../what-we-know-list-item/what-we-know-list-item.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-intro-item',
  templateUrl: './intro-item.component.html',
  styleUrls: ['./intro-item.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    WhatWeKnowListItemComponent,
    NgIf
  ],
  standalone: true
})
export class IntroItemComponent implements OnInit {

  @Input('bgType')
  public bgType: BGType;

  @Input('img')
  public img: string;

  @Input('imgClass')
  public imgClass: string;

  @Input('video')
  public video: string;

  @Input('title1')
  public title1: string;

  @Input('title2')
  public title2: string;

  @Input('label1')
  public label1: string;

  @Input('label2')
  public label2: string;

  @Input('label3')
  public label3: string;

  @Input('alt')
  public alt: string;

  @Input('item1')
  public item1: string;

  @Input('item2')
  public item2: string;

  @Input('item3')
  public item3: string;

  @Input('item4')
  public item4: string;

  @Input('link')
  public link: string;

  @Input('linkItem1')
  public linkItem1: LinkItem;

  @Input('linkItem2')
  public linkItem2: LinkItem;

  @Input('linkItem3')
  public linkItem3: LinkItem;
  @Input('linkItem4')
  public linkItem4: LinkItem;
  @Input('linkItem5')
  public linkItem5: LinkItem;
  @Input('linkItem6')
  public linkItem6: LinkItem;
  @Input('linkItem7')
  public linkItem7: LinkItem;
  @Input('linkItem8')
  public linkItem8: LinkItem;

  @Output('action')
  public action: EventEmitter<any> = new EventEmitter();

  @Input('actionBtn')
  public actionBtn: boolean = false;

  @Input('linkLabel')
  public linkLabel: string;

  @Input('linkClass')
  public linkClass: string;

  @Input('imgSize')
  public imgSize: number = 400;

  @Input('topMargin')
  public topMargin: number = 0;

  public isMobile: boolean = false;

  public get getBGType(): typeof BGType {
    return BGType;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit(): void {
    this.onResize();
  }

  getTopMargin() {
    if (this.isMobile) {
      return 0;
    }
    return this.topMargin;
  }

}

export enum BGType {
  GREY = 'GREY',
  WHITE = 'WHITE',
  BLUE = 'BLUE'
}

export class LinkItem {
  public label: string;
  public url: string;

  constructor(label: string, url: string) {
    this.label = label;
    this.url = url;
  }
}
