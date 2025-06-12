import {Component, OnInit} from '@angular/core';
import {WhatWeKnowListItemComponent} from '../what-we-know-list-item/what-we-know-list-item.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-what-we-know-list',
  templateUrl: './what-we-know-list.component.html',
  styleUrls: ['./what-we-know-list.component.scss'],
  imports: [
    WhatWeKnowListItemComponent,
    TranslateModule
  ],
  standalone: true
})
export class WhatWeKnowListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
