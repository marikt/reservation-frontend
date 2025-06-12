import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {IntegrationData} from '../../../../../model/integration/integration-data';
import {IntegrationTemplateComponent} from '../integration-template/integration-template.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-integration-people',
  templateUrl: './integration-people.component.html',
  styleUrls: ['./integration-people.component.scss'],
  imports: [
    IntegrationTemplateComponent,
    TranslateModule,
    RouterLink
  ],
  standalone: true
})
export class IntegrationPeopleComponent implements OnInit {

  @Input('integrationData')
  public integrationData: IntegrationData = new IntegrationData();

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
