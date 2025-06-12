import {TodoItemState} from '../enum/todo-item-state';
import {TodoItemLevel} from '../enum/todo-item-level';
import {TodoItemType} from '../enum/todo-item-type';

export class TodoItem {

    public id: number;
    public name: string;
    public state: TodoItemState;
    public type: TodoItemType;
    public link: string;
    public description: string;
    public level: TodoItemLevel;

}
