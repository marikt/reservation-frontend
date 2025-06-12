import {Component, OnInit} from '@angular/core';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {TodoItem} from '../../../../../../projects/notado-lib/src/lib/model/todo-item';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {NgForOf, NgIf} from '@angular/common';
import {IntegrationCardComponent} from '../integration-card/integration-card.component';

@Component({
  selector: 'app-integration-status',
  templateUrl: './integration-status.component.html',
  styleUrls: ['./integration-status.component.scss'],
  imports: [
    NgForOf,
    IntegrationCardComponent,
    NgIf
  ],
  standalone: true
})
export class IntegrationStatusComponent implements OnInit {

  public todoItems: TodoItem[] = [];

  constructor(public http: HttpService,
              public dashboardService: DashboardService,
  ) {
  }

  ngOnInit(): void {
    this.loadTodos();

  }

  private loadTodos(): void {
    this.http.get(Api.TODO_ITEM + '/' + this.dashboardService.business.id + '/integrations', (todoItems: TodoItem[]) => {
      this.todoItems = todoItems;
    });
  }

}
