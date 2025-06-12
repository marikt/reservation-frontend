import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {DemoService} from '../../../service/demo.service';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';

@Component({
  selector: 'app-form-adjustment-simple',
  templateUrl: './form-adjustment-simple.component.html',
  styleUrls: ['./form-adjustment-simple.component.scss'],
  imports: [
    IntroItemRevertComponent
  ],
  standalone: true
})
export class FormAdjustmentSimpleComponent implements OnInit {


  constructor(public languageService: LanguageService,
              public demoService: DemoService) {
  }

  ngOnInit(): void {
  }

  public showDemo() {
    this.demoService.showFrame = true
  }
}
