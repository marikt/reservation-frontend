import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {ForAudienceComponent} from '../for-audience/for-audience.component';

@Component({
  selector: 'app-for-other-services',
  templateUrl: './for-other-services.component.html',
  styleUrls: ['./for-other-services.component.scss'],
  imports: [
    ForAudienceComponent
  ],
  standalone: true
})
export class ForOtherServicesComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService,
              public languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.OTHER_SERVICE');
  }
  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
