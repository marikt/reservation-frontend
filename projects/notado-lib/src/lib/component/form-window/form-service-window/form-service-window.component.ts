import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {Server} from '../../../../config/server';
import {ServiceSize} from '../../../util/service-size';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {FormType} from '../../../util/form-type';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {
  FormServiceItemWithDescriptionWindowComponent
} from '../form-service-item-with-description-window/form-service-item-with-description-window.component';
import {FormCourseItemComponent} from '../../form/other/form-course-item/form-course-item.component';
import {ServiceMax} from '../../../model/service-max';
import {AddAlphaColorPipe} from '../../../pipe/add-alpha-color.pipe';

@Component({
  selector: 'app-form-service-window',
  templateUrl: './form-service-window.component.html',
  styleUrls: ['./form-service-window.component.scss'],
  imports: [
    NgForOf,
    FormServiceItemWithDescriptionWindowComponent,
    NgIf,
    FormCourseItemComponent,
    NgStyle,
    AddAlphaColorPipe
  ],
  standalone: true
})
export class FormServiceWindowComponent extends MyForm implements OnInit {

  @Input('formEditMode')
  public formEditMode: boolean = false;

  public serviceSize: ServiceSize = ServiceSize.SMALL;
  public isBigService: boolean;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public server: Server,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
    this.evaluateServiceSize();
    this.onResize();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public validate(): boolean {
    if (this.formService.calendarEvent.service) {
      return true
    }
    return false;
  }

  private evaluateServiceSize() {
    for (const service of this.formService.getServices()) {
      if (service.name.length > 30) {
        this.isBigService = true;
        return;
      }
    }
    this.isBigService = true;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (this.formService.isMobile) {
      this.serviceSize = ServiceSize.MOBILE;
    } else if (this.isBigService) {
      this.serviceSize = ServiceSize.BIG;
    } else {
      this.serviceSize = ServiceSize.SMALL;
    }
  }

  public get serviceSizeEnum(): typeof ServiceSize {
    return ServiceSize;
  }

  public get formType(): typeof FormType {
    return FormType;
  }

  public getServicesForReservation(): ServiceMax[] {
    const services = this.formService.getServices();
    return this.formEditMode ? services.slice(0, 3) : services;
  }
}
