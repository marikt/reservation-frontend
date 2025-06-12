import {Component, Input, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {DemoType} from '../demo.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-demo-modal-service',
  templateUrl: './demo-modal-service.component.html',
  styleUrls: ['./demo-modal-service.component.scss', '../demo.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class DemoModalServiceComponent implements OnInit {

  @Input('demoType')
  public demoType: DemoType;

  constructor(public demoService: DemoService
  ) {
  }

  ngOnInit() {
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }

}
