import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard-menu-support',
  templateUrl: './dashboard-menu-support.component.html',
  styleUrls: ['./dashboard-menu-support.component.scss'],
  imports: [
    TranslateModule,
    RouterLink
  ],
  standalone: true
})
export class DashboardMenuSupportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
