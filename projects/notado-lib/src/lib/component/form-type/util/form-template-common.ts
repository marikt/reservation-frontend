import {LanguageService} from '../../../service/language.service';
import {FormService} from '../../../service/form.service';
import {Server} from '../../../../config/server';
import {HttpService} from '../../../service/http.service';
import { Input, Directive } from '@angular/core';
import {TodoItem} from '../../../model/todo-item';
import {TodoItemLevel} from '../../../enum/todo-item-level';
import {Api} from '../../../enum/api';
import {FormMode} from '../../../util/form-mode.enum';
import {ReservationWindowConfig} from '../../../model/reservation-form/reservation-window-config';

@Directive()
export class FormTemplateCommon {

  @Input('cardName')
  public cardName: string;

  @Input('formEditMode')
  public formEditMode: boolean = false;

  public validated: boolean = false;
  public todoItems: TodoItem[] = [];
  public config: ReservationWindowConfig;

  constructor(public languageService: LanguageService,
              public formService: FormService,
              public server: Server,
              public http: HttpService,
  ) {
    const pathname: string = window.location.pathname;
    if (pathname.includes('dashboard-reservation-form')) {
      this.formEditMode = true;
    }
  }

  /**
   * If we found T.ODO.level >= WARN than the reservation is not possible to create
   */
  public validateCriticalProblems(): void {

    if (this.validated) {
      return;
    }

    this.validated = true;

    if (!this.formService.business) {
      const wrongDomain: TodoItem = new TodoItem();
      wrongDomain.level = TodoItemLevel.ERROR;
      wrongDomain.name = 'TOTO_ITEM.NO_DOMAIN';
      wrongDomain.link = 'dashboard-business';
      this.todoItems.push(wrongDomain);
      return;
    }

    this.http.get(Api.TODO_ITEM + '/' + this.formService.business.id + '/' + TodoItemLevel.WARN, (todoItems: TodoItem[]) => {
        this.todoItems = todoItems;
      }
    );
  }

  public get formMode(): typeof FormMode {
    return FormMode;
  }

}
