import {Component, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard-reservation-card-business-branch',
  templateUrl: './dashboard-reservation-card-business-branch.component.html',
  styleUrls: ['./dashboard-reservation-card-business-branch.component.scss'],
  imports: [
    TranslateModule,
    FormsModule
  ],
  standalone: true
})
export class DashboardReservationCardBusinessBranchComponent implements OnInit {


  constructor(public demoService: DemoService) {

  }
  ngOnInit(): void {
  }

}
