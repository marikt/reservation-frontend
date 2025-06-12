import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../service/language.service';
import {MetaForFormService} from '../../service/meta-for-form.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-language-bar',
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.scss'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class LanguageBarComponent implements OnInit {

  constructor(public languageService: LanguageService,
              public metaService: MetaForFormService) {
  }

  ngOnInit(): void {
  }

  setLanguage(lang: string) {
    this.languageService.setLanguageAndRedirectToUrlLang(lang);
    this.setMeta();
  }

  public setMeta(): void {
    let hostname: string = window.location.hostname;
    hostname = hostname.replace('.notado.cz', '');
    const replacement = '.';
    hostname = hostname.replace(/-([^-]*)$/, replacement + '$1');
    this.metaService.setMetaData('META.RESERVATION_CREATION', hostname + ' - ');
  }
}
