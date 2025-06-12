import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {BlogTemplateComponent} from '../../blog-template/blog-template.component';

@Component({
  selector: 'app-reservation-system-help-your-business',
  templateUrl: './reservation-system-help-your-business.component.html',
  styleUrls: ['./reservation-system-help-your-business.component.scss'],
  imports: [
    TranslateModule,
    BlogTemplateComponent
  ],
  standalone: true
})
export class ReservationSystemHelpYourBusinessComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setMetaData('META.BLOG_01');
  }

}
