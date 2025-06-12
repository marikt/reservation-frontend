import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {FAQItemForBlog} from '../../../blog/blog-template/blog-template.component';
import {ForAudienceComponent} from '../for-audience/for-audience.component';

@Component({
  selector: 'app-for-car-repair',
  templateUrl: './for-car-repair.component.html',
  styleUrls: ['./for-car-repair.component.scss'],
  imports: [
    ForAudienceComponent
  ],
  standalone: true
})
export class ForCarRepairComponent implements OnInit, SetMeta {
  public faq: FAQItemForBlog[] = [];

  constructor(public metaService: MetaService,
              public languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
    this.faq.push(new FAQItemForBlog('Co je hlavní účel Notado pro autoservisy a cykloservisy?', 'Notado je rezervační systém, který umožňuje klientům rezervovat služby autoservisů a cykloservisů online přímo ze svých webových stránek.'));
    this.faq.push(new FAQItemForBlog('Jak dlouho mohu vyzkoušet Notado zdarma?', 'Můžete vyzkoušet Notado zdarma po dobu 3 měsíců.'));
    this.faq.push(new FAQItemForBlog('Jaké služby mohu nabízet k rezervaci pomocí Notado?', 'Můžete nabízet různé služby, jako je celková diagnostika, výměna oleje nebo STK.'));
    this.faq.push(new FAQItemForBlog('Jak mohu přidat rezervační widget Notado na svůj web?', 'Notado nabízí rezervační widget, který můžete snadno integrovat do svého webového místa.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný pro pneuservisy?', 'Ano, Notado je vhodný pro pneuservisy a umožňuje klientům rezervovat služby online.'));
    this.faq.push(new FAQItemForBlog('Jak mohu začít s Notado pro svůj autoservis?', 'Stačí se zaregistrovat na Notado a můžete začít rezervovat své služby.'));
    this.faq.push(new FAQItemForBlog('Může Notado zlepšit zákaznickou zkušenost v mém autoservisu?', 'Ano, díky online rezervacím může Notado zlepšit zákaznickou zkušenost a zefektivnit proces rezervace.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos online rezervací pro autoservisy?', 'Online rezervace poskytuje pohodlí pro zákazníky, kteří si mohou snadno a rychle rezervovat požadované služby.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný i pro jiné typy servisních služeb?', 'Ano, Notado je vhodný pro různé typy servisních služeb, od autoservisů po cykloservisy.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos Notado pro provozovatele cykloservisů?', 'Notado umožňuje provozovatelům cykloservisů nabízet online rezervace a zlepšit tak zákaznickou zkušenost.'));
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.CAR');
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }

}
