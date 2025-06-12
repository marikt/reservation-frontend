import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForIndustryComponent, Industry} from '../for-industry/for-industry.component';
import {FAQItemForBlog} from '../../../blog/blog-template/blog-template.component';

@Component({
  selector: 'app-for-beauty',
  templateUrl: './for-beauty.component.html',
  styleUrls: ['./for-beauty.component.scss'],
  imports: [
    ForIndustryComponent
  ],
  standalone: true
})
export class ForBeautyComponent implements OnInit, SetMeta {

  public industries: Industry[];
  public faq: FAQItemForBlog[] = [];
  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
    this.industries = [];
    this.industries.push(new Industry('HAIR', 'hair.png', 'for-hairdresser'));
    this.industries.push(new Industry('SPA', 'spa.png'));
    this.industries.push(new Industry('BEAUTY', 'beauty.png', 'for-salon'));
    this.industries.push(new Industry('NAIL', 'nail.png'));

    this.faq.push(new FAQItemForBlog('Co je hlavním účelem Notado pro krásu a wellness?', 'Notado je rezervační systém určený pro oblast krásy a wellness, od vlasového stylingu po masáže, který zjednodušuje plánování a správu zákazníků.'));
    this.faq.push(new FAQItemForBlog('Jak dlouho mohu vyzkoušet Notado zdarma?', 'Můžete vyzkoušet Notado zdarma po dobu 3 měsíců.'));
    this.faq.push(new FAQItemForBlog('Proč by kadeřnictví a holičství měly používat rezervační systém?', 'Rezervační systém kadeřnictví a holičství zefektivňuje proces plánování, zkracuje čekací doby, zlepšuje zákaznickou zkušenost a usnadňuje nabízení personalizovaných služeb.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos rezervačního systému pro kadeřníky?', 'Systém umožňuje rychlé a snadné plánování schůzek, správu informací o zákaznících a sledování preferencí zákazníků.'));
    this.faq.push(new FAQItemForBlog('Můžu s Notado sledovat dostupnost v reálném čase?', 'Ano, aktualizace dostupnosti v reálném čase umožňují zákazníkům rychle a snadno rezervovat schůzky.'));
    this.faq.push(new FAQItemForBlog('Usnadňuje Notado správu plateb v kadeřnictví a kosmetických salonech?', 'Ano, systém usnadňuje správu plateb, sledování schůzek a pořádek.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní cíl Notado pro oblast krásy a wellness?', 'Cílem je poskytnout nástroj pro zjednodušení plánování a správy zákazníků pro bezproblémový zážitek.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný pro všechny typy služeb v oblasti krásy?', 'Ano, Notado pokrývá všechny vaše potřeby v oblasti krásy a wellness, od vlasového stylingu po masáže.'));
    this.faq.push(new FAQItemForBlog('Může Notado zlepšit zákaznickou zkušenost v mém salonu?', 'Ano, díky rychlému a snadnému plánování schůzek a aktualizacím dostupnosti v reálném čase může Notado zlepšit zákaznickou zkušenost.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos online rezervací pro kosmetické a wellness služby?', 'Online rezervace zvyšuje efektivitu plánování a zvýšení spokojenosti zákazníků.'));

  }

  public setMeta(): void {
    this.metaService.setMetaData('META.BEAUTY');
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
