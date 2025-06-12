import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-calendar-explain',
  templateUrl: './calendar-explain.component.html',
  styleUrls: ['./calendar-explain.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class CalendarExplainComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit() {
  }

}
