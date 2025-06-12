import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateComponent} from '../../blog-template/blog-template.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-how-online-booking-can-revolutionize-your-hair-salon-business',
  templateUrl: './how-online-booking-can-revolutionize-your-hair-salon-business.component.html',
  styleUrls: ['./how-online-booking-can-revolutionize-your-hair-salon-business.component.scss'],
  imports: [
    BlogTemplateComponent,
    TranslateModule
  ],
  standalone: true
})
export class HowOnlineBookingCanRevolutionizeYourHairSalonBusinessComponent implements OnInit, SetMeta {


  constructor(private metaService: MetaService,
              public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Nejlepší praxe pro nastavení rezervačního systému pro kadeřnictví', 'Chcete maximalizovat potenciál vašeho kadeřnictví? Zjistěte, jak nastavit rezervační systém pro kadeřnictví, aby vyhovoval vašim potřebám a zvyšoval vaše zisky.');
  }
}
