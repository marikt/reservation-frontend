import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard-menu-vertical-simple',
  templateUrl: './dashboard-menu-vertical-simple.component.html',
  styleUrls: ['./dashboard-menu-vertical-simple.component.scss'],
  imports: [
    TranslateModule,
    RouterLink
  ],
  standalone: true
})
export class DashboardMenuVerticalSimpleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
