import {Component, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-demo-modal-thanks',
  templateUrl: './demo-modal-thanks.component.html',
  styleUrls: ['./demo-modal-thanks.component.scss', '../demo.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class DemoModalThanksComponent implements OnInit {

    constructor(public demoService: DemoService
    ) {
    }

    ngOnInit() {
    }

}
