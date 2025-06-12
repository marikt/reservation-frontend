import {Component, HostListener, Input, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FAQItem} from '../../zzzmodules/root-component/faq/faq-module.component';
import {LocalStorageService} from '../../../../projects/notado-lib/src/lib/service/local-storage.service';
import {NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {VideoTutorialComponent} from '../video-tutorial/video-tutorial.component';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {LanguageService} from '../../../../projects/notado-lib/src/lib/service/language.service';

@Component({
  selector: 'app-video-guide',
  templateUrl: './video-guide.component.html',
  styleUrls: ['./video-guide.component.scss'],
  animations: [
    trigger('toggleGuide', [
      state('show', style({
        opacity: 1,
        transform: 'translateX(0)',
      })),
      state('hide', style({
        opacity: 1,
        transform: 'translateX(810px)',
      })),
      transition('show <=> hide', [
        animate('900ms ease-in-out')
      ])
    ])
  ],
  imports: [
    NgIf,
    TranslateModule,
    VideoTutorialComponent,
    NgbTooltip
  ],
  standalone: true
})
export class VideoGuideComponent implements OnInit {

  @Input('videoSrc')
  public videoSrc: string;
  @Input('label')
  public label: string;
  @Input('description')
  public description: string;
  @Input('author')
  public author: boolean = false;
  @Input('faqItems')
  public faqItems: FAQItem[] = [];

  public isMobile: boolean = false;
  public show: boolean = false;
  public environment: any;

  constructor(
    public localStorage: LocalStorageService,
    public languageService: LanguageService,

  ) {
    this.environment = environment;
  }

  ngOnInit(): void {
    this.onResize();
    const isInStorage: boolean = this.localStorage.get(this.videoSrc);
    this.show = (isInStorage == null);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public hideVideoTutorial(): void {
    this.localStorage.add(this.videoSrc, 'true');
    this.show = false;
  }
}
