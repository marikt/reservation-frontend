import {Component, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard-reservation-card-service-group',
  templateUrl: './dashboard-reservation-card-service-group.component.html',
  styleUrls: ['./dashboard-reservation-card-service-group.component.scss'],
  imports: [
    TranslateModule,
    FormsModule
  ],
  standalone: true
})
export class DashboardReservationCardServiceGroupComponent implements OnInit {


  constructor(public demoService: DemoService) {

  }
  ngOnInit(): void {
  }

}
