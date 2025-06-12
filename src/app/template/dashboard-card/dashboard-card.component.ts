import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  imports: [
    RouterLink,
    NgIf,
    TranslateModule
  ],
  standalone: true
})
export class DashboardCardComponent implements OnInit {

    @Input('backLink') backLink: string;

    constructor() {
    }

    ngOnInit() {
    }

}
