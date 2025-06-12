import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForIndustryComponent, Industry} from '../for-industry/for-industry.component';

@Component({
  selector: 'app-for-health',
  templateUrl: './for-health.component.html',
  styleUrls: ['./for-health.component.scss'],
  imports: [
    ForIndustryComponent
  ],
  standalone: true
})
export class ForHealthComponent implements OnInit, SetMeta {


  public industries: Industry[];

  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
    this.industries = [];
    this.industries.push(new Industry('DENTIST', 'dentist.png', 'for-doctor'));
    this.industries.push(new Industry('DOCTOR', 'doctor.png'));
    this.industries.push(new Industry('PSYCHOLOGISTS', 'psychologists.png'));
    this.industries.push(new Industry('MASSAGE', 'massage.png', 'for-massage'));
    this.industries.push(new Industry('PHYSIOTHERAPIST', 'physiotherapist.png'));
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.HEALTH');
  }
  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
