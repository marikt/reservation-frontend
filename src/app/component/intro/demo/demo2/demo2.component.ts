import {Component, Input, OnInit} from '@angular/core';
import {DemoType} from '../demo.component';
import {DemoService} from '../../../../service/demo.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {BrowserFrameComponent} from '../../browser-frame/browser-frame.component';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss'],
  providers: [NgbCarouselConfig],
  imports: [
    TranslateModule,
    BrowserFrameComponent
  ],
  standalone: true
})
export class Demo2Component implements OnInit {

  public bg: string;
  @Input('demoType')
  public demoType: DemoType;
  public img: number = 1;
  public fadeIn: boolean = true;
  public title: string;

  constructor(
    public demoService: DemoService,
    public languageService: LanguageService,
    public translate: TranslateService,
  ) {
  }



  ngOnInit() {

    setInterval(() => {

      this.fadeIn = false;
      setTimeout(() => {
        this.img = ((this.img + 1) % 7);
        this.fadeIn = true;
      }, 500);
    }, 4000);

  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }

}

