import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class TrainingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
