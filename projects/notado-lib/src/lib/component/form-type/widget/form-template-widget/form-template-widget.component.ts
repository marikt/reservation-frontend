import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../service/language.service';
import {FormService} from '../../../../service/form.service';
import {Server} from '../../../../../config/server';
import {HttpService} from '../../../../service/http.service';
import {FormTemplateCommon} from '../../util/form-template-common';
import {FormHeaderWidgetComponent} from '../form-header-widget/form-header-widget.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {ButtonConfigWidgetComponent} from '../button-config-widget/button-config-widget.component';
import {FormTodoItemsComponent} from '../../../form-todo-items/form-todo-items.component';
import {FormFooterWidgetComponent} from '../form-footer-widget/form-footer-widget.component';

@Component({
  selector: 'app-form-template-widget',
  templateUrl: './form-template-widget.component.html',
  styleUrls: ['./form-template-widget.component.scss'],
  imports: [
    FormHeaderWidgetComponent,
    TranslateModule,
    NgIf,
    ButtonConfigWidgetComponent,
    FormTodoItemsComponent,
    FormFooterWidgetComponent
  ],
  standalone: true
})
export class FormTemplateWidgetComponent extends FormTemplateCommon implements OnInit {


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
