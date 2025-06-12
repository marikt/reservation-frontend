import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../service/meta.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogService} from '../../../service/blog-service';
import {NgForOf, NgIf} from '@angular/common';
import {BlogCardComponent} from '../blog-card/blog-card.component';
import {BlogCardCsComponent} from '../blog-card-cs/blog-card-cs.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    BlogCardComponent,
    BlogCardCsComponent
  ],
  standalone: true
})
export class BlogListComponent implements OnInit, SetMeta {

  public blogPosts: BlogPost[] = [];

  constructor(private metaService: MetaService,
              public blogService: BlogService,
              public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();

    this.blogPosts.push(
      new BlogPost(
        'top-5',
        '15.01.2025',
        '28',
        'Analýzy a Porovnání',
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'canceling-reservation',
        '26.04.2024',
        '41',
        'Případové Studie a Rozhovory'
      )
    );

    this.blogPosts.push(
      new BlogPost(
        'permanentky',
        '20.12.2024',
        '42',
        'Průvodci a Návody'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'keyguru',
        '1.5.2025',
        '46',
        'Analýzy a Porovnání'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'neravidelna-pracovni-doba',
        '14.09.2023',
        '35',
        'Průvodci a Návody'
      )
    );

    this.blogPosts.push(
      new BlogPost(
        'rozhovor-s-fotografem',
        '29.09.2023',
        '36',
        'Případové Studie a Rozhovory'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'integrace-na-web',
        '29.09.2023',
        '37',
        'Průvodci a Návody'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'co-je-online-rezervacni-system',
        '01.10.2023',
        '38',
        'Průvodci a Návody'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'telefonicke-vs-online-rezervace',
        '5.08.2023',
        '21',
        'Analýzy a Porovnání'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'guide-for-beginners',
        '11.8.2023',
        '24',
        'Průvodci a Návody'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'rezervacni-system-pro-psychology',
        '4.1.2024',
        '39',
        'Případové Studie a Rozhovory'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'booking-calendar',
        '3.1.2024',
        '40',
        'Případové Studie a Rozhovory'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'price',
        '12.8.2023',
        '25',
        'Analýzy a Porovnání'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'jak-funguje-rezervacni-system',
        '1.08.2023',
        '14',
        'Úvod do Online Rezervačních Systémů'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'notado-integrace-blog',
        '21.8.2023',
        '29',
        'Pokročilé Funkce a Inovace'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'masaz-story',
        '10.8.2023',
        '23',
        'Případové Studie a Rozhovory'
      )
    );

    this.blogPosts.push(
      new BlogPost(
        'sprava-zakazniku',
        '22.8.2023',
        '30',
        'Pokročilé Funkce a Inovace'
      )
    );

    this.blogPosts.push(
      new BlogPost(
        'rezervacni-system-pro-salony',
        '25.8.2023',
        '33',
        'Případové Studie a Rozhovory'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'rezervacni-system-pro-fotografy',
        '25.8.2023',
        '34',
        'Případové Studie a Rozhovory'
      )
    );

    this.blogPosts.push(
      new BlogPost(
        'reverzni-rezervace',
        '6.08.2023',
        '22',
        'Pokročilé Funkce a Inovace'
      )
    );

    this.blogPosts.push(
      new BlogPost(
        'pro-koho-jsou-rezervacni-systemy',
        '6.08.2023',
        '19',
        'Úvod do Online Rezervačních Systémů'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'advantages-and-disadvantages',
        '13.12.2023',
        '26',
        'Výhody a Nevýhody Rezervačních Systémů'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'key-features',
        '13.12.2023',
        '27',
        'Pokročilé Funkce a Inovace'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'jakub-story',
        '02.08.2023',
        '16',
        'Případové Studie a Rozhovory'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'jednoduchy-rezervacni-system',
        '24.8.2023',
        '32',
        'Úvod do Online Rezervačních Systémů'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'how-online-booking-can-revolutionize-your-hair-salon-business',
        '7.04.2023',
        '13',
        'Implementace Rezervačních Systémů v Různých Odvětvích')
    );
    this.blogPosts.push(
      new BlogPost(
        'reservation-system-help-your-business',
        '11.10.2022',
        '01',
        'Průvodci a Návody')
    );
    this.blogPosts.push(
      new BlogPost(
        'google-calendar-as-reservation-system',
        '21.09.2022',
        '02',
        'Průvodci a Návody'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'reservation-system-for-barber',
        '1.01.2022',
        '03',
        'Implementace Rezervačních Systémů v Různých Odvětvích'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'reservation-system-for-massage',
        '3.12.2022',
        '04',
        'Implementace Rezervačních Systémů v Různých Odvětvích'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'configurable-booking-form',
        '12.12.2022',
        '07',
        'Pokročilé Funkce a Inovace')
    );
    this.blogPosts.push(
      new BlogPost(
        'reservation-system-for-sport-venue',
        '6.12.2022',
        '05',
        'Implementace Rezervačních Systémů v Různých Odvětvích')
    );
    this.blogPosts.push(
      new BlogPost(
        'reservation-system-and-security',
        '12.06.2022',
        '06',
        'Výhody a Nevýhody Rezervačních Systémů')
    );
    this.blogPosts.push(
      new BlogPost(
        'payments-during-booking',
        '13.12.2022',
        '08',
        'Pokročilé Funkce a Inovace'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'jak-vybrat-rezervacni-system',
        '13.12.2022',
        '43',
        'Jak vybrat online rezervační systém'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'proc-ne-system-zdarma',
        '23.8.2022',
        '31',
        'Implementace Rezervačních Systémů v Různých Odvětvích'
      )
    );
    this.blogPosts.push(
      new BlogPost(
        'booking-for-dentists',
        '18.12.2022',
        '09',
        'Implementace Rezervačních Systémů v Různých Odvětvích'
      )
    );

    this.blogPosts.push(
      new BlogPost(
        'about-notado',
        '24.12.2022',
        '10',
        'Úvod do Online Rezervačních Systémů')
    );
    this.blogPosts.push(
      new BlogPost(
        'notado-features',
        '24.06.2021',
        '11',
        'Úvod do Online Rezervačních Systémů')
    );
    this.blogPosts.push(
      new BlogPost(
        'booking-for-yoga',
        '12.09.2022',
        '12',
        'Úvod do Online Rezervačních Systémů')
    );
    this.blogPosts.push(
      new BlogPost(
        'jak-funguje-rezervacni-system',
        '12.09.2022',
        '44',
        'Úvod do Online Rezervačních Systémů')
    );
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Optimalizace podnikání pomocí online rezervačního systému: Kompletní seznam článků', 'Přečtěte si naše články a dozvíte se, jak efektivně využít online rezervační systém k maximalizaci vašeho podnikání. Získejte tipy, best practices a strategie pro lepší rezervace a zákaznickou spokojenost.');
  }

}

export class BlogPost {
  public link: string;
  public date: string;
  public id: string;
  public name: string;
  public preview: string;
  public img: string;
  public czech: boolean;
  public title: string;
  public desc: string;
  public tag: string;

  constructor(link: string,
              date: string,
              id: string,
              tag: string,
              title?: string,
              desc?: string) {
    this.link = link;
    this.date = date;
    this.tag = tag;
    this.id = id;
    this.title = title;
    this.desc = desc;
  }
}
