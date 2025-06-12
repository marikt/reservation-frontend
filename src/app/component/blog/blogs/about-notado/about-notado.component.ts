import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {BlogTemplateComponent} from '../../blog-template/blog-template.component';

@Component({
  selector: 'app-about-notado',
  templateUrl: './about-notado.component.html',
  styleUrls: ['./about-notado.component.scss'],
  imports: [
    TranslateModule,
    BlogTemplateComponent
  ],
  standalone: true
})
export class AboutNotadoComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setMetaData('META.BLOG_10');
  }

}
