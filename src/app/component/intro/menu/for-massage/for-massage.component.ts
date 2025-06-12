import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {ForAudienceComponent} from '../for-audience/for-audience.component';

@Component({
  selector: 'app-for-massage',
  templateUrl: './for-massage.component.html',
  styleUrls: ['./for-massage.component.scss'],
  imports: [
    ForAudienceComponent
  ],
  standalone: true
})
export class ForMassageComponent implements OnInit, SetMeta {

  constructor(
    public metaService: MetaService,
    public languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.MASSAGE');
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
