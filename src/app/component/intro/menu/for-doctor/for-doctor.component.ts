import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForAudienceComponent} from '../for-audience/for-audience.component';

@Component({
  selector: 'app-for-doctor',
  templateUrl: './for-doctor.component.html',
  styleUrls: ['./for-doctor.component.scss'],
  imports: [
    ForAudienceComponent
  ],
  standalone: true
})
export class ForDoctorComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.DOCTOR');
  }


  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
