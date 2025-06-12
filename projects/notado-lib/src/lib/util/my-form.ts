import {FormService} from '../service/form.service';
import {MySubscribable} from './my-subscribable';
import {BroadcastService} from '../service/broadcast.service';
import { OnInit, Directive } from '@angular/core';
import {TodoItem} from '../model/todo-item';
import {FormMode} from './form-mode.enum';
import {TodoItemLevel} from '../enum/todo-item-level';
import {Api} from '../enum/api';
import {HttpService} from '../service/http.service';
import {LanguageService} from '../service/language.service';
import {FormWindowName} from './form-window-name';
import {MetaForFormService} from '../service/meta-for-form.service';
import {ReservationWindow} from '../model/reservation-form/reservation-window';

@Directive()
export abstract class MyForm extends MySubscribable implements OnInit {

  public showValidation: boolean = false;
  public todoItems: TodoItem[] = [];
  public FormMode: FormMode = FormMode.DEMO;
  public showReasonOfError: boolean = false;
  public window: ReservationWindow;
  public SERVER: string;
  public valid: boolean = true;

  protected constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
  ) {
    super(broadcastService);
  }

  public ngOnInit() {
    this.languageService.initLanguage();
    this.formService.loadBusinessAndTemplate(() => {
      this.window = this.formService.template.windows[this.formService.idx];
      if (this.window.name === FormWindowName.SERVICE_GROUP || this.window.name === FormWindowName.SERVICE) {
        this.validateTodos();
      }
    });

    this.addThisWindowForValidation();
    window.scroll(0, 0);
  }

  public addThisWindowForValidation(): void {
    this.formService.formWindows.push(this);
  }

  abstract validate(): boolean;

  public isValid(): boolean {
    return this.valid;
  }

  public validateTodos(): boolean {

    if (!this.formService.business) {
      this.valid = false;
      const wrongDomain: TodoItem = new TodoItem();
      wrongDomain.level = TodoItemLevel.ERROR;
      wrongDomain.name = 'TOTO_ITEM.NO_DOMAIN';
      wrongDomain.link = 'dashboard-business';
      this.todoItems.push(wrongDomain);
      return true;
    }

    this.http.get(Api.TODO_ITEM + '/' + this.formService.business.id + '/' + TodoItemLevel.WARN, (todoItems: TodoItem[]) => {
        this.todoItems = todoItems;
        if (todoItems && todoItems.length > 0) {
          this.valid = false;
        }
      }
    );
    return true;
  }

  public setMeta(): void {
    let hostname: string = window.location.hostname;
    hostname = hostname.replace('.notado.cz', '');
    const replacement = '.';
    hostname = hostname.replace(/-([^-]*)$/, replacement + '$1');
    this.metaService.setMetaData('META.RESERVATION_CREATION', hostname + ' - ');
  }

}
