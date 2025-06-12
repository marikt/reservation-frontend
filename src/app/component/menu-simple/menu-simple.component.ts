import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../../projects/notado-lib/src/lib/service/language.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-menu-simple',
  templateUrl: './menu-simple.component.html',
  styleUrls: ['./menu-simple.component.scss'],
  imports: [
    RouterLink,
    NgIf,
    TranslateModule,
    RouterLinkActive
  ],
  standalone: true
})
export class MenuSimpleComponent implements OnInit {

  @Input('route')
  public route: string;

  constructor(public languageService: LanguageService,) { }

  ngOnInit(): void {
  }

}
