import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {TodoItem} from '../../../projects/notado-lib/src/lib/model/todo-item';
import {TodoItemState} from '../../../projects/notado-lib/src/lib/enum/todo-item-state';
import {TodoItemLevel} from '../../../projects/notado-lib/src/lib/enum/todo-item-level';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';
import {Injectable} from '@angular/core';
import {TodoItemType} from '../../../projects/notado-lib/src/lib/enum/todo-item-type';
import {Business} from '../../../projects/notado-lib/src/lib/model/business';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService extends MySubscribable {
  public todoItems: TodoItem[];
  public todoItemWarnOrErrorNames: string[] = [];
  public googleCalendarConnected: boolean = false;
  public reservationButtonAdded: boolean = false;
  public allTodoItemsDone: boolean = false;

  constructor(
    public http: HttpService,
    public broadcastService: BroadcastService
  ) {
    super(broadcastService);

    this.subscribe(Event.GOOGLE_CALENDAR_SUCCESSFULLY_CONNECTED, (business: Business) => {
      this.loadTodos(business);
    });

    this.subscribe(Event.BUSINESSES_LOADED, (business: Business) => {
      this.loadTodos(business);
    });
  }

  public loadTodos(business: Business): void {
    if (business) {
      this.http.get(Api.TODO_ITEM + '/' + business.id, (todoItems: TodoItem[]) => {
        this.todoItems = todoItems;
        this.pushTodoItemWarnOrErrorNames();
        this.googleCalendarConnected = this.isTodoItemDone(TodoItemType.GOOGLE_CALENDAR_CONNECT);
        this.reservationButtonAdded = this.isTodoItemDone(TodoItemType.RESERVATION_BUTTON);
        this.allTodoItemsDone = this.isAllTodoItemDone();
      });
    }
  }

  private pushTodoItemWarnOrErrorNames(): void {
    this.todoItemWarnOrErrorNames = [];
    for (const todoItem of this.todoItems) {
      if (todoItem.state === TodoItemState.TODO && (todoItem.level === TodoItemLevel.ERROR || todoItem.level === TodoItemLevel.WARN)) {
        this.todoItemWarnOrErrorNames.push(todoItem.name);
      }
    }
  }

  public isTodoItemDone(type: TodoItemType): boolean {
    for (const todoItem of this.todoItems) {
      if (todoItem.type === type) {
        return todoItem.state === TodoItemState.DONE;
      }
    }
  }

  public get todoItemLevel(): typeof TodoItemLevel {
    return TodoItemLevel;
  }

  public isAllTodoItemDone(): boolean {
    for (const todoItem of this.todoItems) {
      if (todoItem.state !== TodoItemState.DONE) {
        return false;
      }
    }
    return true;
  }
}
