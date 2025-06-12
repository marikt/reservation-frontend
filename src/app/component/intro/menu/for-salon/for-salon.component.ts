import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForAudienceComponent} from '../for-audience/for-audience.component';

@Component({
  selector: 'app-for-salon',
  templateUrl: './for-salon.component.html',
  styleUrls: ['./for-salon.component.scss'],
  imports: [
    ForAudienceComponent
  ],
  standalone: true
})
export class ForSalonComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.SALON');
  }
}
