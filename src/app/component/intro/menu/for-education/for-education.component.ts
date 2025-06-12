import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {DemoType} from '../../demo/demo.component';
import {ForIndustryComponent, Industry} from '../for-industry/for-industry.component';
import {FAQItemForBlog} from '../../../blog/blog-template/blog-template.component';

@Component({
  selector: 'app-for-education',
  templateUrl: './for-education.component.html',
  styleUrls: ['./for-education.component.scss'],
  imports: [
    ForIndustryComponent
  ],
  standalone: true
})
export class ForEducationComponent implements OnInit, SetMeta {

  public industries: Industry[];

  public faq: FAQItemForBlog[] = [];

  constructor(public metaService: MetaService,
  ) {
  }

  ngOnInit(): void {
    this.setMeta();
    this.industries = [];
    this.industries.push(new Industry('SCHOOLS', 'school.png'));
    this.industries.push(new Industry('KINDERGARTEN', 'kindergarten.png'));
    this.industries.push(new Industry('COURSE', 'course.png', 'for-course'));
    this.industries.push(new Industry('TEACHING', 'teaching.png'));

    this.faq.push(new FAQItemForBlog('Co je hlavním účelem Notado pro vzdělávání a kurzy?', 'Notado je rezervační systém určený pro poskytovatele vzdělávání a školení, který nabízí snadné plánování a registraci na kurzy, workshopy a kurzy.'));
    this.faq.push(new FAQItemForBlog('Jak dlouho mohu vyzkoušet Notado zdarma?', 'Můžete vyzkoušet Notado zdarma po dobu 3 měsíců.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný pro nezávislé lektory?', 'Ano, ať už jste zavedenou institucí nebo nezávislým lektorem, Notado usnadňuje správu vašeho podnikání v oblasti vzdělávání.'));
    this.faq.push(new FAQItemForBlog('Jaký je hlavní přínos online rezervací pro vzdělávání?', 'Online rezervace poskytuje flexibilitu a pohodlí pro studenty a profesionály, kteří si chtějí naplánovat schůzky a kurzy pro své vzdělávání a profesní rozvoj.'));

  }

  public setMeta(): void {
    this.metaService.setMetaData('META.EDUCATION');
  }
  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }
}
