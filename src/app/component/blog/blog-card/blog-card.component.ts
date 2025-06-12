import {Component, HostListener, Input, OnInit} from '@angular/core';
import {BlogPost} from '../blog-list/blog-list.component';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogService} from '../../../service/blog-service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
  imports: [
    TranslateModule,
    RouterLink
  ],
  standalone: true
})
export class BlogCardComponent implements OnInit {

  @Input('blogPost')
  public blogPost: BlogPost;
  public isMobile: boolean;

  constructor(public languageService: LanguageService,
              public blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }


  }
}
