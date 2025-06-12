import {Component, OnInit} from '@angular/core';
import {FormService} from '../../../../service/form.service';
import {NgForOf, NgIf} from '@angular/common';
import {AddAlphaColorPipe} from '../../../../pipe/add-alpha-color.pipe';

@Component({
  selector: 'app-vertical-booking-progress',
  templateUrl: './vertical-booking-progress.component.html',
  styleUrls: ['./vertical-booking-progress.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    AddAlphaColorPipe
  ],
  standalone: true
})
export class VerticalBookingProgressComponent implements OnInit {

  constructor(public formService: FormService) {
  }

  ngOnInit(): void {
  }

}
