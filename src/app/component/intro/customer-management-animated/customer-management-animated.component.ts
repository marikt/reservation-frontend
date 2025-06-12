import {Component, OnInit} from '@angular/core';
import {bounceInOnEnterAnimation, bounceInUpOnEnterAnimation, bounceOutOnLeaveAnimation} from "angular-animations";
import {CustomerAnimated} from "../../../model/customer-animated";
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-customer-management-animated',
  templateUrl: './customer-management-animated.component.html',
  styleUrls: ['./customer-management-animated.component.scss'],
  animations: [
    bounceInOnEnterAnimation(),
    bounceInUpOnEnterAnimation(),
    bounceOutOnLeaveAnimation()
  ],
  imports: [
    TranslateModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class CustomerManagementAnimatedComponent implements OnInit {

  public state = true;
  public idx: number[] = [1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1];
  public events: CustomerAnimated[] = [];

  constructor() {
  }

  ngOnInit(): void {
    let eventA: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Tea', 'rgb(142, 218, 237)', 'tea@gmail.com', '77 877 7149', '01.png');
    let eventB: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Kenan', 'rgb(254, 179, 132)', 'kenan@seznam.cz', '77 290 1201', '02.png');
    let eventC: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Tyler', 'rgb(142, 218, 237)', 'tyler@gmail.com', '77 531 1796', '03.png');
    let eventD: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Tina', 'rgb(254, 179, 132)', 'tina@gmail.com', '77 752 0290', '04.png');
    let eventE: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Zofia', 'rgb(142, 218, 237)', 'zofia@centru.cz', '77 619 2395', '05.png');
    let eventF: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Bear', 'rgb(254, 179, 132)', 'bear@gmail.com', '77 752 0290', '06.png');
    let eventG: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Taine', 'rgb(142, 218, 237)', 'taine@centru.cz', '77 619 2395', '07.png');
    let eventH: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Chance', 'rgb(254, 179, 132)', 'bear@gmail.com', '77 752 0290', '08.png');
    let eventI: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Enya', 'rgb(142, 218, 237)', 'taine@centru.cz', '77 619 2395', '09.png');
    let eventJ: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Nida', 'rgb(254, 179, 132)', 'bear@gmail.com', '77 752 0290', '10.png');
    // let eventK: CustomerAnimated = CustomerManagementAnimatedComponent.createCustomerAnimated('Taine Rivas', 'rgb(142, 218, 237)', 'taine@centru.cz', '77 619 2395', '07.png');

    this.events.push(eventA);
    this.events.push(eventB);
    this.events.push(eventC);
    this.events.push(eventD);
    this.events.push(eventE);
    this.events.push(eventF);
    this.events.push(eventG);
    this.events.push(eventH);
    this.events.push(eventI);
    this.events.push(eventJ);
    // this.events.push(eventK);

    let event = this.events[0];
    event.show = !event.show;

    let i: number = 0;
    setInterval(() => {
        let event = this.events[this.idx[i % this.idx.length]];
        event.show = !event.show;
        i++;
      },
      800
    );
  }

  private static createCustomerAnimated(name: string,
                                        color: string,
                                        email: string,
                                        phone: string,
                                        image: string): CustomerAnimated {
    let customerAnimated: CustomerAnimated = new CustomerAnimated();
    customerAnimated.name = name;
    customerAnimated.color = color;
    customerAnimated.email = email;
    customerAnimated.phone = phone;
    customerAnimated.fullPathImg = image;
    return customerAnimated;
  }

}
