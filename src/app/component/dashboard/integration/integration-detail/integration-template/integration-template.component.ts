import {Component, Input, OnInit} from '@angular/core';
import {IntegrationData} from '../../../../../model/integration/integration-data';
import {IntegrationImgComponent} from '../../integration-img/integration-img.component';
import {NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-integration-template',
  templateUrl: './integration-template.component.html',
  styleUrls: ['./integration-template.component.scss'],
  imports: [
    IntegrationImgComponent,
    NgIf,
    TranslateModule
  ],
  standalone: true
})
export class IntegrationTemplateComponent implements OnInit {

  @Input('integrationData')
  public integrationData: IntegrationData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
