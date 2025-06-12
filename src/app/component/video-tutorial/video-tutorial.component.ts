import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateModule} from '@ngx-translate/core';
import {SafeUrlPipe} from '../../pipe/safe-url.pipe';
import {NgIf} from '@angular/common';
import {LanguageService} from '../../../../projects/notado-lib/src/lib/service/language.service';

@Component({
  selector: 'app-video-tutorial',
  templateUrl: './video-tutorial.component.html',
  styleUrls: ['./video-tutorial.component.scss'],
  imports: [
    TranslateModule,
    SafeUrlPipe,
    NgIf
  ],
  standalone: true
})
export class VideoTutorialComponent implements OnInit {

  @Input('label')
  label: string;

  @Input('videoSrc')
  videoSrc: string;

  @Input('btnType')
  btnType: string;

  public isMobile: boolean = false;


  constructor(
    public modalService: ModalService,
    public languageService: LanguageService,
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

  getImg() {
    const regex = /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
    const match = this.videoSrc.match(regex);
    const videoId = match[1];
    return 'https://i.ytimg.com/vi/' + videoId + '/sddefault.jpg'
  }

}
