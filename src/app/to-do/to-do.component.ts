import {Component, computed, effect, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {Todo, TodoServiceService} from '../todo-service.service';

@Component({
  selector: 'app-to-do',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
  ],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})

export class ToDoComponent {
  newTodo: Todo = {
    text: '',
    isCompleted: false,
  };
  constructor(public todoService: TodoServiceService) {
  }

  addTodo() {
    this.todoService.addToDo(this.newTodo)
    this.newTodo = {
      text: '',
      isCompleted: false,
    };
  }

  onSubmitForm() {

  }

}
