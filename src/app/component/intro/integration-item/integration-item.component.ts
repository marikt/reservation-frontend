import {Component, Input, OnInit} from '@angular/core';
import {IntegrationData} from '../../../model/integration/integration-data';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-integration-item',
  templateUrl: './integration-item.component.html',
  styleUrls: ['./integration-item.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class IntegrationItemComponent implements OnInit {

  @Input('integration')
  public integration: IntegrationData;

  constructor() { }

  ngOnInit(): void {
  }

}
