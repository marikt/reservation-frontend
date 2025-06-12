import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'add-holiday-modal',
  templateUrl: './add-holiday-modal.component.html',
  styleUrls: ['./add-holiday-modal.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class AddHolidayModalComponent implements OnInit {


  constructor(
  ) {
  }

  ngOnInit() {
  }



}
