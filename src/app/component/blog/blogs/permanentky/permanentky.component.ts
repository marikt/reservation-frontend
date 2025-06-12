import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-permanentky',
  templateUrl: './permanentky.component.html',
  styleUrls: ['./permanentky.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class PermanentkyComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Vytvářejte Slevové Kupóny a Permanentky Snadno a Rychle', 'Objevte novou funkci aplikace Notado pro tvorbu slevových kupónů a permanentek. Flexibilní nastavení, snadná správa a plná integrace se Stripe. Přilákejte zákazníky a zvyšte loajalitu ještě dnes!');

  }

}
