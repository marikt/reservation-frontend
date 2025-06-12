import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForIndustryComponent, Industry} from '../for-industry/for-industry.component';
import {FAQItemForBlog} from '../../../blog/blog-template/blog-template.component';

@Component({
  selector: 'app-for-events',
  templateUrl: './for-events.component.html',
  styleUrls: ['./for-events.component.scss'],
  imports: [
    ForIndustryComponent
  ],
  standalone: true
})
export class ForEventsComponent implements OnInit, SetMeta {

  public industries: Industry[];
  public faq: FAQItemForBlog[] = [];
  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
    this.industries = [];
    this.industries.push(new Industry('ESCAPE', 'escape.png'));
    this.industries.push(new Industry('VR', 'vr.png', 'for-other-services'));
    this.industries.push(new Industry('ART', 'art.png'));
    this.industries.push(new Industry('PHOTOGRAPHER', 'photographer.png'));
    this.industries.push(new Industry('EVENTS', 'events.png'));

    this.faq.push(new FAQItemForBlog('Jaký je hlavní účel Notado pro události a zábavu?', 'Notado je rezervační systém určený pro plánování a správu událostí a zábavy.'));
    this.faq.push(new FAQItemForBlog('Jak dlouho mohu vyzkoušet Notado zdarma?', 'Můžete vyzkoušet Notado zdarma po dobu 3 měsíců.'));
    this.faq.push(new FAQItemForBlog('Proč by únikové místnosti měly používat rezervační systém?', 'Rezervační systém únikových místností umožňuje rychlé a snadné plánování schůzek, zkracuje čekací doby a zlepšuje zákaznickou zkušenost.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos rezervačního systému pro únikové místnosti?', 'Systém pomáhá spravovat informace o zákaznících, usnadňuje nabízení personalizovaných služeb a sledování preferencí zákazníků.'));
    this.faq.push(new FAQItemForBlog('Může Notado sledovat dostupnost v reálném čase pro únikové místnosti?', 'Ano, aktualizace dostupnosti v reálném čase umožňují zákazníkům rychle a snadno rezervovat schůzky.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos rezervačního systému pro VR parky?', 'S rezervačním systémem VR parků lze schůzky naplánovat rychle a snadno, zkrátit čekací doby a umožnit zákazníkům vybrat si požadovaný časový úsek.'));
    this.faq.push(new FAQItemForBlog('Může Notado usnadnit správu plateb pro události a zábavu?', 'Ano, systém Notado usnadňuje sledování schůzek, správu plateb a udržování pořádku.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný pro všechny typy událostí a zábavy?', 'Ano, Notado je vhodný pro různé typy událostí a zábavy, od únikových místností po VR parky.'));
    this.faq.push(new FAQItemForBlog('Jak Notado pomáhá zlepšit zákaznickou zkušenost v oblasti událostí?', 'Díky rychlému a snadnému plánování schůzek a aktualizacím dostupnosti v reálném čase může Notado zlepšit zákaznickou zkušenost.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos online rezervací pro události a zábavu?', 'Online rezervace poskytuje flexibilitu a pohodlí pro jednotlivce a skupiny, kteří si chtějí naplánovat svůj další výlet.'));

  }

  public setMeta(): void {
    this.metaService.setMetaData('META.EVENTS');
  }
  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
