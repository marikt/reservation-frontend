import {Component, Input, OnInit} from '@angular/core';
import {ServiceSize} from '../../../util/service-size';
import {FormService} from '../../../service/form.service';
import {Server} from '../../../../config/server';
import {ButtonConfig} from '../../form-type/util/button-config';
import {HttpService} from '../../../service/http.service';
import {SpinnerService} from '../../../service/spinner.service';
import {BusinessBranchMax} from '../../../model/business-branch-max';
import {NgIf, NgStyle} from '@angular/common';


@Component({
  selector: 'app-form-business-branch-item-window',
  templateUrl: './form-business-branch-item-window.component.html',
  styleUrls: ['./form-business-branch-item-window.component.scss'],
  imports: [
    NgIf,
    NgStyle
  ],
  standalone: true
})
export class FormBusinessBranchItemWindowComponent extends ButtonConfig implements OnInit {

  @Input('businessBranch')
  public businessBranch: BusinessBranchMax;

  constructor(public formService: FormService,
              public http: HttpService,
              public spinnerService: SpinnerService,
              public server: Server,
  ) {
    super(formService, http, spinnerService);
  }

  ngOnInit() {
  }

  public get businessBranchSizeEnum(): typeof ServiceSize {
    return ServiceSize;
  }

  selectBusinessBranch() {
    this.formService.calendarEvent.businessBranch = this.businessBranch;
    this.nextFormWindow();
  }

  public handleImageNotLoaded() {
    console.error('handleImageNotLoaded()');
    this.businessBranch.fullPathImg = null;
  }
}
