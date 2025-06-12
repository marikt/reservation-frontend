import {Component, Input, OnInit} from '@angular/core';
import {ServiceSize} from '../../../util/service-size';
import {FormService} from '../../../service/form.service';
import {Server} from '../../../../config/server';
import {ServiceGroupMax} from '../../../model/service-group-max';
import {ButtonConfig} from '../../form-type/util/button-config';
import {HttpService} from '../../../service/http.service';
import {SpinnerService} from '../../../service/spinner.service';
import {NgIf, NgStyle} from '@angular/common';


@Component({
  selector: 'app-form-service-group-item-window',
  templateUrl: './form-service-group-item-window.component.html',
  styleUrls: ['./form-service-group-item-window.component.scss'],
  imports: [
    NgIf,
    NgStyle
  ],
  standalone: true
})
export class FormServiceGroupItemWindowComponent extends ButtonConfig implements OnInit {

  @Input('serviceGroup')
  public serviceGroup: ServiceGroupMax;

  constructor(public formService: FormService,
              public http: HttpService,
              public spinnerService: SpinnerService,
              public server: Server,
  ) {
    super(formService, http, spinnerService);
  }

  ngOnInit() {
  }

  public get serviceGroupSizeEnum(): typeof ServiceSize {
    return ServiceSize;
  }

  selectServiceGroup() {
    this.formService.calendarEvent.serviceGroup = this.serviceGroup;
    this.nextFormWindow();
  }

  public handleImageNotLoaded() {
    console.error('handleImageNotLoaded()');
    this.serviceGroup.fullPathImg = null;
  }
}
