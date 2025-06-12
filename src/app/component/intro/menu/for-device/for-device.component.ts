import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {FAQItemForBlog} from '../../../blog/blog-template/blog-template.component';
import {ForAudienceComponent} from '../for-audience/for-audience.component';

@Component({
  selector: 'app-for-device',
  templateUrl: './for-device.component.html',
  styleUrls: ['./for-device.component.scss'],
  imports: [
    ForAudienceComponent
  ],
  standalone: true
})
export class ForDeviceComponent implements OnInit, SetMeta {

  public faq: FAQItemForBlog[] = [];

  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
    this.faq.push(new FAQItemForBlog('Co je hlavní účel Notado pro zařízení?', 'Notado je rezervační systém určený pro výřivky, sauny a jiná zařízení na krátkodobý pronájem.'));
    this.faq.push(new FAQItemForBlog('Jak dlouho mohu vyzkoušet Notado zdarma?', 'Můžete vyzkoušet Notado zdarma po dobu 3 měsíců.'));
    this.faq.push(new FAQItemForBlog('Pro jaké typy zařízení je Notado vhodný?', 'Notado je vhodný pro privatní sauny, výřivky a jakákoliv jiná zařízení na krátkodobý pronájem.'));
    this.faq.push(new FAQItemForBlog('Jak Notado pomáhá zefektivnit proces rezervace zařízení?', 'Notado umožňuje online rezervace, což zjednodušuje proces a eliminuje potřebu vyřizování telefonních objednávek.'));
    this.faq.push(new FAQItemForBlog('Můžu s Notado přizpůsobit rezervační formulář dle svých potřeb?', 'Ano, můžete si nastavit vlastní políčka v rezervačním formuláři a tyto údaje budou uloženy přímo do vytvořené rezervace.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos online rezervací pro zařízení?', 'Online rezervace poskytuje pohodlí pro zákazníky, kteří si mohou snadno a rychle rezervovat svůj požadovaný čas.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný pro specifické podniky?', 'Ano, ať už provozujete sauny, výřivky nebo jiná specifická zařízení, Notado usnadňuje správu vašeho podnikání.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos Notado pro provozovatele saun?', 'Notado umožňuje provozovatelům saun snadné plánování, sledování dostupnosti a správu rezervací.'));
    this.faq.push(new FAQItemForBlog('Může Notado usnadnit správu plateb pro zařízení?', 'Ano, systém Notado usnadňuje sledování schůzek, správu plateb a udržování pořádku.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos Notado pro provozovatele výřivek?', 'Díky Notado mohou provozovatelé výřivek nabízet online rezervace, sledovat dostupnost a zlepšit zákaznickou zkušenost.'));


  }

  public setMeta(): void {
    this.metaService.setMetaData('META.DEVICE');
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
