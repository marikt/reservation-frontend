import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard-menu-form',
  templateUrl: './dashboard-menu-form.component.html',
  styleUrls: ['./dashboard-menu-form.component.scss'],
  imports: [
    TranslateModule,
    RouterLink
  ],
  standalone: true
})
export class DashboardMenuFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
