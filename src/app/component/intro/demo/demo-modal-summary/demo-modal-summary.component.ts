import {Component, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-demo-modal-summary',
  templateUrl: './demo-modal-summary.component.html',
  styleUrls: ['./demo-modal-summary.component.scss', '../demo.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class DemoModalSummaryComponent implements OnInit {

    constructor(public demoService: DemoService
    ) {
    }

    ngOnInit() {
    }

}
