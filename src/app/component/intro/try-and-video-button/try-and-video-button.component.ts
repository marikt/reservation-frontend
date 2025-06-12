import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-try-and-video-button',
  templateUrl: './try-and-video-button.component.html',
  styleUrls: ['./try-and-video-button.component.scss'],
  imports: [
    VideoTutorialComponent,
    TranslateModule,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class TryAndVideoButtonComponent implements OnInit {

  public isMobile: boolean;
  constructor(public languageService: LanguageService
  ) {

  }

  ngOnInit() {
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

