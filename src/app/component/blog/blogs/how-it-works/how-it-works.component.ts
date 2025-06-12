import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateComponent} from '../../blog-template/blog-template.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  imports: [
    BlogTemplateComponent,
    TranslateModule
  ],
  standalone: true
})
export class HowItWorksComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Jak funguje online rezervační systém? | Notado Insights', 'Vstupte do digitální éry, kde stroje zjednodušují operace. Pochopit, jak funguje online rezervační systém a jeho nezastupitelnou roli v odvětví služeb.');
  }

}
