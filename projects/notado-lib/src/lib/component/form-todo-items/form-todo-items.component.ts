import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from '../../model/todo-item';
import {FormService} from '../../service/form.service';
import {NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-form-todo-items',
  templateUrl: './form-todo-items.component.html',
  styleUrls: ['./form-todo-items.component.scss'],
  imports: [
    NgIf,
    TranslateModule,
    NgForOf
  ],
  standalone: true
})
export class FormTodoItemsComponent implements OnInit {

  @Input('todoItems')
  public todoItems: TodoItem[] = [];

  constructor(public formService: FormService) {
  }

  ngOnInit(): void {

  }


}
