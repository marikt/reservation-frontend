import {Component, OnInit} from '@angular/core';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {ContactComponent} from '../../intro/contact/contact.component';

@Component({
  selector: 'app-dashboard-contact',
  templateUrl: './dashboard-contact.component.html',
  styleUrls: ['./dashboard-contact.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    ContactComponent
  ],
  standalone: true
})
export class DashboardContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
