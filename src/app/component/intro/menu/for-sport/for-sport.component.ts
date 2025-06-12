import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForIndustryComponent, Industry} from '../for-industry/for-industry.component';
import {FAQItemForBlog} from '../../../blog/blog-template/blog-template.component';

@Component({
  selector: 'app-for-sport',
  templateUrl: './for-sport.component.html',
  styleUrls: ['./for-sport.component.scss'],
  imports: [
    ForIndustryComponent
  ],
  standalone: true
})
export class ForSportComponent implements OnInit, SetMeta {

  public industries: Industry[];
  public faq: FAQItemForBlog[] = [];
  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();

    this.industries = [];
    this.industries.push(new Industry('TRAINER', 'trainer.png'));
    this.industries.push(new Industry('SPORT_VENUES', 'sport-venues.png', 'for-sports-ground'));
    this.industries.push(new Industry('FITNESS', 'fitness.png'));
    this.industries.push(new Industry('YOGA', 'yoga.png', 'for-yoga'));

    this.faq.push(new FAQItemForBlog('Jaký je hlavní účel Notado pro sport a fitness?', 'Notado je rezervační systém určený pro sportovní a fitness služby, který usnadňuje plánování a správu rezervací.'));
    this.faq.push(new FAQItemForBlog('Jak dlouho mohu vyzkoušet Notado zdarma?', 'Můžete vyzkoušet Notado zdarma po dobu 3 měsíců.'));
    this.faq.push(new FAQItemForBlog('Proč by osobní trenéři měli používat rezervační systém?', 'Rezervační systém osobního trenéra usnadňuje plánování schůzek, zkracuje čekací doby, zlepšuje zákaznickou zkušenost a umožňuje sledovat pokrok klientů.'));
    this.faq.push(new FAQItemForBlog('Jak Notado pomáhá zefektivnit proces plánování pro osobní trenéry?', 'Díky rezervačnímu systému osobního trenéra lze schůzky naplánovat rychle a snadno, a také sledovat informace o klientech.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos rezervačního systému pro sportoviště?', 'Rezervační systém sportovišť umožňuje rychlé a snadné plánování schůzek, zkracuje čekací doby a zlepšuje zákaznickou zkušenost.'));
    this.faq.push(new FAQItemForBlog('Může Notado sledovat dostupnost v reálném čase pro sportoviště?', 'Ano, aktualizace dostupnosti v reálném čase umožňují zákazníkům rychle a snadno rezervovat schůzky.'));
    this.faq.push(new FAQItemForBlog('Jak Notado pomáhá zlepšit zákaznickou zkušenost v oblasti sportu?', 'Díky rychlému a snadnému plánování schůzek a aktualizacím dostupnosti v reálném čase může Notado zlepšit zákaznickou zkušenost.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný pro všechny typy sportovních a fitness služeb?', 'Ano, Notado je vhodný pro různé typy sportovních a fitness služeb, od osobních trenérů po sportoviště.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos online rezervací pro sport a fitness?', 'Online rezervace poskytuje flexibilitu a pohodlí pro jednotlivce, kteří chtějí zůstat aktivní a zdraví.'));
    this.faq.push(new FAQItemForBlog('Může Notado usnadnit správu plateb pro sportovní a fitness služby?', 'Ano, systém Notado usnadňuje sledování schůzek, správu plateb a udržování pořádku.'));


  }

  public setMeta(): void {
    this.metaService.setMetaData('META.SPORT');
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
