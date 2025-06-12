import {Component, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-demo-modal-contact',
  templateUrl: './demo-modal-contact.component.html',
  styleUrls: ['./demo-modal-contact.component.scss', '../demo.component.scss'],
  imports: [
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class DemoModalContactComponent implements OnInit {
    public showValidation: boolean;

    constructor(
        public demoService: DemoService
    ) {
    }

    ngOnInit() {
    }

    onSubmit() {

    }
}
