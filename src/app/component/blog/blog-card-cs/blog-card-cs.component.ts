import {Component, HostListener, Input, OnInit} from '@angular/core';
import {BlogPost} from '../blog-list/blog-list.component';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogService} from '../../../service/blog-service';
import {RouterLink} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-blog-card-cs',
  templateUrl: './blog-card-cs.component.html',
  styleUrls: ['./blog-card-cs.component.scss'],
  imports: [
    RouterLink,
    TranslateModule
  ],
  standalone: true
})
export class BlogCardCsComponent implements OnInit {

  @Input('blogPost')
  public blogPost: BlogPost;
  public isMobile: boolean;

  constructor(public languageService: LanguageService,
              public blogService: BlogService,
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
