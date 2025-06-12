import {Component, Input, OnInit} from '@angular/core';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-loading-progress',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class LoadingProgressComponent implements OnInit {


  @Input('label')
  public label: string;

  constructor(public spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
  }


}
