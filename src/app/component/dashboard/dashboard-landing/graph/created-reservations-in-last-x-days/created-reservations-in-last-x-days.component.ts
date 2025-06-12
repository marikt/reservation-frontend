import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../../../projects/notado-lib/src/lib/enum/api';
import {DashboardService} from '../../../../../service/dashboard.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {format, subDays} from 'date-fns';

@Component({
  selector: 'app-created-reservations-in-last-x-days',
  templateUrl: './created-reservations-in-last-x-days.component.html',
  styleUrls: ['./created-reservations-in-last-x-days.component.scss'],
  imports: [
    TranslateModule,
    FormsModule,
    NgForOf,
    NgIf,
    NgxChartsModule,

  ],
  standalone: true
})
export class CreatedReservationsInLastXDays implements OnInit {

  activeTab: string = 'LAST_30_DAYS';
  single: any[] = [];
  reservationsByWorker: any[] = [];
  reservationsByService: any[] = [];
  view: any[] = [1000, 400];

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Reservations';

// Color schemes for different charts
  last30DaysColorScheme = {
    domain: ['rgba(105, 59, 218, 0.5)']  // Same color scheme as before for LAST_30_DAYS
  };

  byWorkerColorScheme = {
    domain: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)',
      'rgba(153, 102, 255, 0.5)'
    ]
  };

  byServiceColorScheme = {
    domain: [
      'rgba(255, 159, 64, 0.5)',
      'rgba(201, 203, 207, 0.5)',
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(153, 102, 255, 0.5)'
    ]
  };

  constructor(private http: HttpService,
              public dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.loadReservationData();
    this.loadReservationsByWorker();
    this.loadReservationsByService();
  }

  loadReservationData(): void {
    this.http.get(Api.STATISTIC + '/last-30-days/' + this.dashboardService.business.id, (data: any[]) => {
      const dataMap = new Map(data.map(item => [item.day, item.count]));
      this.single = Array.from({ length: 30 }, (_, i) => {
        const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
        return {
          name: date,
          value: dataMap.get(date) || 0
        };
      }).reverse();
    });
  }

  loadReservationsByWorker(): void {
    this.http.get(Api.STATISTIC + '/all-reservations-by-worker/' + this.dashboardService.business.id, (data: any[]) => {
      this.reservationsByWorker = data
        .filter(item => item.worker_name)  // Exclude entries with null or undefined worker_name
        .map(item => ({
          name: item.worker_name,
          value: item.reservation_count
        }));
    });
  }

  loadReservationsByService(): void {
    this.http.get(Api.STATISTIC + '/all-reservations-by-service/' + this.dashboardService.business.id, (data: any[]) => {
      this.reservationsByService = data
        .filter(item => item.service_name)  // Exclude entries with null or undefined service_name
        .map(item => ({
          name: item.service_name,
          value: item.reservation_count
        }));
    });
  }

  onSelect(event): void {
    console.log(event);
  }
}

