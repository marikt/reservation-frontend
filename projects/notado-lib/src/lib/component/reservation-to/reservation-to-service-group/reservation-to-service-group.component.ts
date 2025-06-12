import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormService} from '../../../service/form.service';

@Component({
    selector: 'app-reservation-to-service-group',
    templateUrl: './reservation-to-service-group.component.html',
    styleUrls: ['./reservation-to-service-group.component.scss'],
    standalone: true
})
export class ReservationToServiceGroupComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {
  }

  ngOnInit() {
    const serviceGroupId = this.route.snapshot.paramMap.get('service_group_id');
    this.formService.openReservationFormForServiceGroup(Number(serviceGroupId));
  }

}
