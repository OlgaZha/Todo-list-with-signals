import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodoServiceService} from '../todo-service.service';
import {TodoStatisticsComponent} from '../todo-statistics/todo-statistics.component';
import {ProfileFormComponent} from '../profile-form/profile-form.component';
import {TodoTipsComponent} from '../todo-tips/todo-tips.component';
import {TodoQuotesComponent} from '../todo-quotes/todo-quotes.component';
import {Todo} from '../models';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-to-do',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TodoStatisticsComponent,
    ProfileFormComponent,
    TodoTipsComponent,
    TodoQuotesComponent,
    RouterLink
  ],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})

export class ToDoComponent {
  newTodo =  {
    text: '',
    isCompleted: false,
  };
  constructor(public todoService: TodoServiceService) {
  }

  addTodo() {
    this.todoService.addToDo(this.newTodo);
    this.newTodo = {
      text: '',
      isCompleted: false,
    };
  }

  protected readonly TodoServiceService = TodoServiceService;
}
