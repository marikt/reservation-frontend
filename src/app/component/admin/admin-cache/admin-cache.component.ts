import {Component, OnInit} from '@angular/core';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {CacheEnum} from '../../../util/cache-enum';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-admin-cache',
  templateUrl: './admin-cache.component.html',
  styleUrls: ['./admin-cache.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    NgForOf,
    JsonPipe,
    NgIf
  ],
  standalone: true
})
export class AdminCacheComponent implements OnInit {

  public cache;
  public cacheKeys: string[] = Object.keys(CacheEnum);

  constructor(
    public http: HttpService
  ) {
  }

  ngOnInit() {
  }

  public showCache(cacheName: string) {
    this.http.get(Api.ADMIN + '/cache/' + cacheName,
      (cache) => {
        this.cache = cache;
      });
  }

}
