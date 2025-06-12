import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ActivatedRoute} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {NgForOf, NgIf} from '@angular/common';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clear-cache-external-page',
  templateUrl: './clear-cache-external-page.component.html',
  styleUrls: ['./clear-cache-external-page.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    NgbAlert,
    NgForOf
  ],
  standalone: true
})
export class ClearCacheExternalPageComponent implements OnInit {

  public businessId: number|string;
  public calendars: Calendar[] = [];
  public readyToRefresh: boolean = true;

  constructor(
    public http: HttpService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public alertService: AlertService,
    public languageService: LanguageService

  ) {
  }

  ngOnInit(): void {
    this.businessId = this.route.snapshot.paramMap.get('business-id');
    this.loadCalendars();
  }

  public loadCalendars(): void {
    this.http.get(Api.CALENDAR + '/all/' + this.businessId, (calendars: Calendar[]) => {
      this.calendars = calendars;
      if (!this.calendars) {
        this.calendars = [];
      }
    });
  }

  public deleteCache() {
    console.log('refresh cache');
    this.readyToRefresh = false;
    for (const calendar of this.calendars) {

      this.http.post(Api.CACHE + '/clear-calendar/' + this.businessId,
        {id: calendar.id}, () => {
          setTimeout(() => {
              this.readyToRefresh = true; // do not allow abusing refresh button as it calls google api
            },
            20_000);
        });
    }
    this.alertService.addSuccess(this.translate.instant('ALERT.CACHE_DELETED'));
  }

}

