import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForAudienceComponent} from '../for-audience/for-audience.component';

@Component({
  selector: 'app-for-course',
  templateUrl: './for-course.component.html',
  styleUrls: ['./for-course.component.scss'],
  imports: [
    ForAudienceComponent
  ],
  standalone: true
})
export class ForCourseComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.COURSE');
  }
  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
