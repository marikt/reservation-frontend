import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../../../../service/dashboard.service';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {FormService} from '../../../../../../../projects/notado-lib/src/lib/service/form.service';
import {MetaService} from '../../../../../service/meta.service';
import {SpinnerService} from '../../../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {Server} from '../../../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HighlightComponentForEditor} from '../../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-template';
import {NgIf} from '@angular/common';
import {ColorPickerModule} from 'ngx-color-picker';
import {FormsModule} from '@angular/forms';
import 'leader-line';
import {VideoTutorialComponent} from '../../../../video-tutorial/video-tutorial.component';

declare let LeaderLine: any;

@Component({
  selector: 'app-dashboard-reservation-form-custom',
  templateUrl: './dashboard-reservation-form-custom.component.html',
  styleUrls: ['./dashboard-reservation-form-custom.component.scss'],
  imports: [
    NgIf,
    ColorPickerModule,
    TranslateModule,
    FormsModule,
    VideoTutorialComponent
  ],
  standalone: true
})
export class DashboardReservationFormCustomComponent implements OnInit, OnDestroy {

  public backgroundFromUrl: string = null;
  public lines: any[] = [];

  constructor(
    public dashboardService: DashboardService,
    public formService: FormService,
    public metaService: MetaService,
    private spinnerService: SpinnerService,
    public server: Server,
    public http: HttpService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.formService.template.highlightComponentForEditor = new HighlightComponentForEditor();
    setTimeout(() => {
      const el1 = document.getElementById('componentColor');
      const el2 = document.getElementById('form-next');
      this.createLineRelation(el1, el2);

      const el3 = document.getElementById('formColor');
      const el4 = document.getElementById('mainContainer');
      this.createLineRelation(el3, el4);

      const el5 = document.getElementById('textColor');
      const el6 = document.getElementById('mainLabel');
      this.createLineRelation(el5, el6);

      const el7 = document.getElementById('textButtonColor');
      const el8 = document.getElementById('form-next');
      this.createLineRelation(el7, el8);

      const el9 = document.getElementById('backgroundMainColor');
      const el10 = document.getElementById('backgroundColorComponent1');
      this.createLineRelation(el9, el10);

      const el11 = document.getElementById('backgroundColor');
      const el12 = document.getElementById('backgroundColorComponent2');
      this.createLineRelation(el11, el12);

      const el13 = document.getElementById('backgroundTextColor');
      const el14 = document.getElementById('textColorComponentDetail');
      this.createLineRelation(el13, el14);

      const el15 = document.getElementById('serviceCardColor');
      const el16 = document.getElementById('serviceItemComponentInForm');
      this.createLineRelation(el15, el16);

      const el17 = document.getElementById('serviceCardTextColor');
      const el18 = document.getElementById('serviceItemComponentTextInForm');
      this.createLineRelation(el17, el18);


    }, 700);
  }

  public ngOnDestroy() {
    for (const line of this.lines) {
      line.remove();
    }
    this.lines = [];
  }

  private createLineRelation(el1: HTMLElement, el2: HTMLElement) {

    if (!el1 || !el2) {
      console.error('el1 or el2 is null');
      return;
    }

    const line = new LeaderLine(
      LeaderLine.mouseHoverAnchor(el1, 'draw', {
        animOptions: {
          duration: 1000,
        },
        style: {
          backgroundColor: null,
          startPlugColor: '#FFC007',
          startPlugSize: 5,
          startPlug: 'disc',
        },
        hoverStyle: {
          backgroundColor: null
        }
      }),
      el2, {color: '#D4D4D4', size: 1.3, path: 'fluid'});
    line.setOptions({
      startPlugColor: '#FFC007',
      startPlugSize: 3,
      startPlug: 'disc',
      endPlugColor: '#FFC007',
      endPlugSize: 3,
      endPlug: 'disc',
    });
    this.lines.push(line);
  }
}
