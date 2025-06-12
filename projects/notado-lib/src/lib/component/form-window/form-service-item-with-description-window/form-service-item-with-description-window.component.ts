import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {FormService} from '../../../service/form.service';
import {Server} from '../../../../config/server';
import {ServiceMax} from '../../../model/service-max';
import {ServiceSize} from '../../../util/service-size';
import {ButtonConfig} from '../../form-type/util/button-config';
import {HttpService} from '../../../service/http.service';
import {SpinnerService} from '../../../service/spinner.service';
import {ReservationWindow} from '../../../model/reservation-form/reservation-window';
import {NgIf, NgStyle} from '@angular/common';
import {RatingPipe} from '../../../pipe/rating.pipe';
import {DaysHoursMinutesPipe} from '../../../pipe/hours-minutes.pipe';
import {AddAlphaColorPipe} from '../../../pipe/add-alpha-color.pipe';

@Component({
  selector: 'app-form-service-item-with-description-window',
  templateUrl: './form-service-item-with-description-window.component.html',
  styleUrls: ['./form-service-item-with-description-window.component.scss'],
  imports: [
    NgIf,
    RatingPipe,
    DaysHoursMinutesPipe,
    AddAlphaColorPipe,
    NgStyle
  ],
  standalone: true
})
export class FormServiceItemWithDescriptionWindowComponent extends ButtonConfig implements OnInit, OnDestroy {

  @Input('window')
  public window: ReservationWindow;

  @Input('service')
  public service: ServiceMax;

  @Input('serviceSize')
  public serviceSize: ServiceSize;

  @Input('formEditMode')
  public formEditMode: boolean = false;

  public showImage: boolean = false;
  private intervalId: any;

  constructor(
    public formService: FormService,
    public http: HttpService,
    public spinnerService: SpinnerService,
    public server: Server,
  ) {
    super(formService, http, spinnerService);
  }

  ngOnInit() {
    this.updateShowImage();
    if (this.formEditMode) {
      this.intervalId = setInterval(() => {
        this.updateShowImage();
      }, 2000);
    }
  }

  ngOnDestroy() {
    if (this.formEditMode) {
      clearInterval(this.intervalId);
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateShowImage();
  }

  private updateShowImage() {
    this.showImage = this.evaluateShowImage();
  }

  private evaluateShowImage(): boolean {
    if (!this.service.fullPathImg) {
      return false;
    }
    if (!this.service.description) {
      return true;
    }
    if (this.service.description.length > 250) {
      return false;
    }
    if (window.innerWidth < 576 && this.service.description.length > 150) {
      return false;
    }
    return true;
  }

  public doNothing(): void {
    console.log('!!! doNothing')
  }

  public handleImageNotLoaded() {
    console.error('handleImageNotLoaded()');
    this.service.fullPathImg = null;
  }
}
