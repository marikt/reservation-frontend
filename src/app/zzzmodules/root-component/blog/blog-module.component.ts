import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {MenuComponent} from '../../../component/menu/menu.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../../../component/intro/footer/footer.component';

@Component({
  selector: 'app-blog-module',
  templateUrl: './blog-module.component.html',
  styleUrls: ['./blog-module.component.scss'],
  imports: [
    MenuComponent,
    RouterOutlet,
    FooterComponent
  ],
  standalone: true
})
export class BlogModuleComponent implements OnInit {



  constructor(
    public languageService: LanguageService,
  ) {
  }

  ngOnInit() {
    this.languageService.initLanguage();
  }
}
