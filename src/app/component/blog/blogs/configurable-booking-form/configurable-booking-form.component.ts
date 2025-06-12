import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-configurable-booking-form',
  templateUrl: './configurable-booking-form.component.html',
  styleUrls: ['./configurable-booking-form.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class ConfigurableBookingFormComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setMetaData('META.BLOG_07');
  }

}
