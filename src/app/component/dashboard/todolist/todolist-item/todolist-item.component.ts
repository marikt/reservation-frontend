import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from '../../../../../../projects/notado-lib/src/lib/model/todo-item';
import {TodoItemState} from '../../../../../../projects/notado-lib/src/lib/enum/todo-item-state';
import {NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {VideoTutorialComponent} from '../../../video-tutorial/video-tutorial.component';
import {TodoItemType} from '../../../../../../projects/notado-lib/src/lib/enum/todo-item-type';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {
  GoogleCalendarConnectBusinessItemComponent
} from '../../google-calendar-connect-business-item/google-calendar-connect-business-item.component';

@Component({
  selector: 'app-todolist-item',
  templateUrl: './todolist-item.component.html',
  styleUrls: ['./todolist-item.component.scss'],
  imports: [
    NgIf,
    NgbTooltip,
    TranslateModule,
    RouterLink,
    VideoTutorialComponent,
    GoogleCalendarConnectBusinessItemComponent
  ],
  standalone: true
})
export class TodolistItemComponent implements OnInit {

  @Input('todoItem') todoItem: TodoItem;
  @Input('showBottomBorder') showBottomBorder: boolean = false;

  constructor(public modalService: ModalService) {
  }

  ngOnInit() {
  }

  public isDone(item: TodoItem): boolean {
    return item.state === TodoItemState.DONE;
  }

  getLink(todoItem: TodoItem): string {

    if (todoItem.link && todoItem.link.includes('faq')) {
      return todoItem.link;
    }
    return '/dashboard/' + todoItem.link;
  }

  public get getTodoItemType(): typeof TodoItemType {
    return TodoItemType;
  }
}
