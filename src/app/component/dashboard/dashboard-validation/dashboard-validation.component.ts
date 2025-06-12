import {Component, OnInit} from '@angular/core';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';

/**
 * depricated
 */
@Component({
  selector: 'app-dashboard-validation',
  templateUrl: './dashboard-validation.component.html',
  styleUrls: ['./dashboard-validation.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    NgbProgressbar
  ],
  standalone: true
})
export class DashboardValidationComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
