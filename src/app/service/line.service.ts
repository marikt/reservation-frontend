import {Injectable} from '@angular/core';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {Service} from '../../../projects/notado-lib/src/lib/model/service';
import {Worker} from '../../../projects/notado-lib/src/lib/model/worker';
import {ServiceInRelation} from '../../../projects/notado-lib/src/lib/model/service-in-relation';
import 'leader-line';
import {DashboardService} from './dashboard.service';
import {CalendarWithOwner} from '../component/dashboard/dashboard-calendar-usage/dashboard-calendar-usage.component';
import {Router} from '@angular/router';
import {ServiceType} from '../../../projects/notado-lib/src/lib/enum/service-type';

declare let LeaderLine: any;

@Injectable({
  providedIn: 'root'
})
export class LineService {

  public lines: any[] = [];
  public services: Service[];
  public workers: Worker[];
  public calendars: CalendarWithOwner[] = [];
  private servicesInRelationPerWorker: Map<number, ServiceInRelation[]> = new Map<number, ServiceInRelation[]>();
  private allLoaded: boolean = false;

  constructor(public http: HttpService,
              public dashboardService: DashboardService,
              private router: Router
  ) {
  }

  public clean() {
    this.allLoaded = false;
    if (this.router.url.includes('dashboard-landing')) {
      this.destroyLines();
      this.loadedWorkerAndServicesAndCreateLines();
    }
  }

  public loadedWorkerAndServicesAndCreateLines() {
    if (this.allLoaded) {
      setTimeout(() => {
        this.createAllRelations();
      }, 500);
      return;
    }

    this.http.get(Api.SERVICE + '/by-business/' + this.dashboardService.business.id, (services: Service[]) => {
      this.services = services.filter(s => s.type !== ServiceType.COUPON);
    });

    this.http.get(Api.WORKER + '/by-business/' + this.dashboardService.business.id, (workers: Worker[]) => {
      this.workers = workers;
      for (const worker of workers) {
        this.http.get(Api.RELATION + '/' + this.dashboardService.business.id + '/' + worker.id + '/service-relation-for-worker',
          (servicesInRelation: ServiceInRelation[]) => {
            this.servicesInRelationPerWorker.set(worker.id, servicesInRelation);
          });
      }
    });

    this.http.get(Api.CALENDAR + '/all-with-owners/' + this.dashboardService.business.id, (calendars: CalendarWithOwner[]) => {
      this.calendars = calendars.filter(c => c.owners && c.owners.length > 0);
      if (!this.calendars) {
        this.calendars = [];
      }
    });
    setTimeout(() => {
      this.createAllRelations();
      this.allLoaded = true;
    }, 2000);

    setTimeout(() => {
      this.clean();
    }, 500_000);

  }

  public destroyLines() {
    for (const line of this.lines) {
      line.remove();
    }
    this.lines = [];
  }

  private createAllRelations() {
    if (!(this.workers && this.workers.length < 20 && this.services && this.services.length < 20)) {
      return;
    }
    for (const calendar of this.calendars) {

      if (!calendar) {
        continue;
      }

      for (const owner of calendar.owners) {
        const calendarEl = document.getElementById('calendar' + calendar.id);
        let ownerEl;
        if ('email' in owner) {
          ownerEl = document.getElementById('worker' + owner.id);
        } else if ('duration' in owner) {
          ownerEl = document.getElementById('service' + owner.id);
        } else {
          continue;
        }

        this.createLineRelation(calendarEl, ownerEl);
      }
    }

    for (const worker of this.workers) {
      const serviceInRelations = this.servicesInRelationPerWorker.get(worker.id);
      for (const serviceInRelation of serviceInRelations) {
        if (serviceInRelation.active) {
          const serviceEl = document.getElementById('service' + serviceInRelation.service.id);
          const workerEl = document.getElementById('worker' + worker.id);
          this.createLineRelation(serviceEl, workerEl);
        }
      }
    }
  }

  private createLineRelation(el1: HTMLElement, el2: HTMLElement) {
    if (!this.router.url.includes('dashboard-landing')) {
      this.destroyLines();
      return;
    }

    if (!el1 || !el2) {
      return;
    }

    const line1 = new LeaderLine(
      LeaderLine.mouseHoverAnchor(el1, 'draw', {
        animOptions: {
          duration: 1500,
        },
        style: {
          backgroundColor: null,
          startPlugColor: '#693BDA',
          startPlugSize: 2,
          startPlug: 'disc',
        },
        hoverStyle: {
          backgroundColor: null
        }
      }),
      el2, {color: '#D4D4D4', size: 1.3, path: 'fluid'});
    line1.setOptions({
      startPlugColor: '#693BDA',
      startPlugSize: 2,
      startPlug: 'disc',
      endPlugColor: '#693BDA',
      endPlugSize: 2,
      endPlug: 'disc',
    });
    this.lines.push(line1);

    const line2 = new LeaderLine(
      LeaderLine.mouseHoverAnchor(el2, 'draw', {
        animOptions: {
          duration: 1500,
        },
        style: {
          backgroundColor: null,
          startPlugColor: '#693BDA',
          startPlugSize: 2,
          startPlug: 'disc',
        },
        hoverStyle: {
          backgroundColor: null
        }

      }),
      el1, {color: '#D4D4D4', size: 1.3, path: 'fluid'});
    line2.setOptions({
      startPlugColor: '#693BDA',
      startPlugSize: 2,
      startPlug: 'disc',
      endPlugColor: '#693BDA',
      endPlugSize: 2,
      endPlug: 'disc',
    });
    this.lines.push(line2);
  }

}
