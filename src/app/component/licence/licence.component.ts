import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class LicenceComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
