import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {TranslateModule} from '@ngx-translate/core';
import {WhatWeKnowListComponent} from '../../what-we-know-list/what-we-know-list.component';

@Component({
  selector: 'app-what-we-know-menu',
  templateUrl: './what-we-know-menu.component.html',
  styleUrls: ['./what-we-know-menu.component.scss'],
  imports: [
    TranslateModule,
    WhatWeKnowListComponent
  ],
  standalone: true
})
export class WhatWeKnowMenuComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.WHAT_WE_KNOW');
  }

}

