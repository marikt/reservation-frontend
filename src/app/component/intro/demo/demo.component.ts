import {Component, Input, OnInit} from '@angular/core';
import {DemoService} from '../../../service/demo.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {BrowserFrameComponent} from '../browser-frame/browser-frame.component';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  imports: [
    TranslateModule,
    BrowserFrameComponent
  ],
  standalone: true
})
export class DemoComponent implements OnInit {

  @Input('demoType')
  public demoType: DemoType;

  public bg: string;

  constructor(
    public demoService: DemoService,
    public languageService: LanguageService,
  ) {
    if (!this.demoType) {
      this.demoType = DemoType.BARBER;
    }

    this.bg = 'background: url(\'../../../../resources/demo/' + this.demoType + '.png\') no-repeat top center;    -webkit-background-size: cover;    -moz-background-size: cover;    -o-background-size: cover;    background-size: cover;    min-height: 390px;    overflow-x: hidden;'
  }

  ngOnInit() {
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }

}


export enum DemoType {

  HIDE = 'HIDE',
  BARBER = 'BARBER',
  MASSAGE = 'MASSAGE',
  DENTIST = 'DENTIST',
  CAR = 'CAR',
  YOGA = 'YOGA',
  VR = 'VR',
  ONLINE_COURSE = 'ONLINE_COURSE',
  SAUNA = 'SAUNA',
  SPORT_GROUND = 'SPORT_GROUND',


}
