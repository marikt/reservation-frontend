import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class FooterComponent implements OnInit {

  public environment: any;

  constructor(
    public languageService: LanguageService
  ) {
    this.environment = environment;
  }

  ngOnInit(): void {
  }

}
