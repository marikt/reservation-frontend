import {Component, Input, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-what-we-know-list-item',
  templateUrl: './what-we-know-list-item.component.html',
  styleUrls: ['./what-we-know-list-item.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class WhatWeKnowListItemComponent implements OnInit {

  @Input('label')
  label: string;

  constructor() { }

  ngOnInit(): void {
  }

}
