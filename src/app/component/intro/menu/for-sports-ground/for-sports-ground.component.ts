import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForAudienceComponent} from '../for-audience/for-audience.component';

@Component({
  selector: 'app-for-sports-ground',
  templateUrl: './for-sports-ground.component.html',
  styleUrls: ['./for-sports-ground.component.scss'],
  imports: [
    ForAudienceComponent
  ],
  standalone: true
})
export class ForSportsGroundComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.SPORT_GROUND');
  }
  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
