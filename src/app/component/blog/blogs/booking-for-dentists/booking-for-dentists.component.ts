import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateComponent} from '../../blog-template/blog-template.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-booking-for-dentists',
  templateUrl: './booking-for-dentists.component.html',
  styleUrls: ['./booking-for-dentists.component.scss'],
  imports: [
    BlogTemplateComponent,
    TranslateModule
  ],
  standalone: true
})
export class BookingForDentistsComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setMetaData('META.BLOG_09');
  }

}
