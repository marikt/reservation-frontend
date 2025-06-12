import {TodoItemLevel} from '../../../projects/notado-lib/src/lib/enum/todo-item-level';

export class HealthCheckResult {

  public entityName: string;
  public entityId: string;
  public entity: string;
  public level: TodoItemLevel;
  public description: string[];

  constructor() {
  }

}
