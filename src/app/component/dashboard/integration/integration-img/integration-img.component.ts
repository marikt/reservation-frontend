import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-integration-img',
    templateUrl: './integration-img.component.html',
    styleUrls: ['./integration-img.component.scss'],
    standalone: true
})
export class IntegrationImgComponent implements OnInit {

  @Input('name') name: string;
  @Input('color') color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
