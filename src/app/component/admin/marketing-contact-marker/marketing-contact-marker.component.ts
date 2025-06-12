import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {MarketingContact} from '../../../model/marketing-contact';
import {MarketingContactSearchCriteria} from '../../../model/search/marketing-contact-search-criteria';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {MarketingContactState} from '../../../util/marketing-contact-state';
import {NgIf} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';

@Component({
  selector: 'app-marketing-contact-marker',
  templateUrl: './marketing-contact-marker.component.html',
  styleUrls: ['./marketing-contact-marker.component.scss'],
  imports: [
    NgIf,
    DashboardCardComponent,
    DashboardCardLabelComponent
  ],
  standalone: true
})
export class MarketingContactMarkerComponent implements OnInit {

  public contacts: MarketingContact[] = [];
  public contact: MarketingContact;


  constructor(private http: HttpService) {
  }

  ngOnInit(): void {

    const searchCriteria: MarketingContactSearchCriteria = new MarketingContactSearchCriteria();
    searchCriteria.state = MarketingContactState.UNDEFINED;

    this.http.post(Api.MARKETING + '/search', searchCriteria,
      (contacts) => {
        this.contacts = contacts;
        this.contact = this.contacts.pop();
      });
  }

  public setReadyToSendContact(): void {
    this.setContact(MarketingContactState.READY_TO_SEND);
  }

  public cancelContact(): void {
    this.setContact(MarketingContactState.CANCELED);
  }

  private setContact(state: MarketingContactState) {
    this.contact.state = state;
    this.http.put(Api.MARKETING + '/' + this.contact.id, this.contact, () => {
      this.contact = this.contacts.pop();
    });
  }

  public sendEmails(): void {
    this.http.get(Api.MARKETING + '/send-emails');
  }

  public readContacts() {
    this.http.get(Api.MARKETING + '/read-contacts');

  }
}
