import {Component, Input, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {DemoType} from '../demo.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {DemoModalContactComponent} from '../demo-modal-contact/demo-modal-contact.component';
import {DemoModalServiceComponent} from '../demo-modal-service/demo-modal-service.component';
import {DemoModalDateComponent} from '../demo-modal-date/demo-modal-date.component';
import {DemoModalSummaryComponent} from '../demo-modal-summary/demo-modal-summary.component';
import {DemoModalThanksComponent} from '../demo-modal-thanks/demo-modal-thanks.component';

@Component({
  selector: 'app-demo-modal',
  templateUrl: './demo-modal.component.html',
  styleUrls: ['./demo-modal.component.scss', '../demo.component.scss'],
  imports: [
    TranslateModule,
    NgSwitch,
    DemoModalContactComponent,
    DemoModalServiceComponent,
    DemoModalDateComponent,
    DemoModalSummaryComponent,
    DemoModalThanksComponent,
    NgIf,
    NgSwitchCase
  ],
  standalone: true
})
export class DemoModalComponent implements OnInit {

  @Input('demoType')
  demoType: DemoType;

  constructor(
    public demoService: DemoService,
  ) {
  }

  ngOnInit() {
  }

  public resetAndClose(): void {
    this.demoService.reset();
    this.demoService.showFrame = false;
  }
}
