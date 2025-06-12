import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../service/language.service';
import {FormService} from '../../../../service/form.service';
import {Server} from '../../../../../config/server';
import {HttpService} from '../../../../service/http.service';
import {FormTemplateCommon} from '../../util/form-template-common';
import {VerticalBookingProgressComponent} from '../vertical-booking-progress/vertical-booking-progress.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {ButtonConfigFullscreenComponent} from '../../fullscreen/button-config-fullscreen/button-config-fullscreen.component';
import {FormTodoItemsComponent} from '../../../form-todo-items/form-todo-items.component';
import {BookingDetailFullscreenComponent} from '../../fullscreen/booking-detail-fullscreen/booking-detail-fullscreen.component';

@Component({
  selector: 'app-form-template-simple',
  templateUrl: './form-template-simple.component.html',
  styleUrls: ['./form-template-simple.component.scss'],
  imports: [
    VerticalBookingProgressComponent,
    TranslateModule,
    NgIf,
    ButtonConfigFullscreenComponent,
    FormTodoItemsComponent,
    BookingDetailFullscreenComponent
  ],
  standalone: true
})
export class FormTemplateSimpleComponent extends FormTemplateCommon implements OnInit {

  constructor(public languageService: LanguageService,
              public formService: FormService,
              public server: Server,
              public http: HttpService,
  ) {
    super(languageService, formService, server, http);
  }
  ngOnInit(): void {
    this.validateCriticalProblems();
  }

}
