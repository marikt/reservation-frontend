import {Component, Input} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateComponent} from '../blog-template/blog-template.component';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {RowFaqItemComponent} from '../../util/row-faq-item/row-faq-item.component';
import {TryButtonComponent} from '../../intro/try-button/try-button.component';
import {RouterLink} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-blog-template-cs',
  templateUrl: './blog-template-cs.component.html',
  styleUrls: ['./blog-template-cs.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    RowFaqItemComponent,
    TryButtonComponent,
    RouterLink,
    TranslateModule,
    NgStyle
  ],
  standalone: true
})
export class BlogTemplateCsComponent extends BlogTemplateComponent {

  constructor(public languageService: LanguageService) {
    super(languageService);
  }

  ngOnInit(): void {
  }

}


