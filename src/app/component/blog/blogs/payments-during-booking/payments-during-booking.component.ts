import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-payments-during-booking',
  templateUrl: './payments-during-booking.component.html',
  styleUrls: ['./payments-during-booking.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class PaymentsDuringBookingComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Jak integrace s platebními bránami může zlepšit váš rezervační systém?', 'Integrace s platebními bránami může přinést novou úroveň pohodlí a efektivity vašemu rezervačnímu systému. Zjistěte, jak to může zvýšit vaše obraty a zákaznickou spokojenost.');

  }

}
