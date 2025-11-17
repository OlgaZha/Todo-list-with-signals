import {Component, computed, inject, input} from '@angular/core';
import {TodoServiceService} from '../todo-service.service';
import {Todo} from '../models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-details',
  imports: [],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss'
})
export class TodoDetailsComponent {
  private todoService = inject(TodoServiceService);
  private router = inject(Router);
  id = input.required<string>();
  todo = computed<Todo|undefined>(() => {
    let numericId = Number(this.id());
    return this.todoService.getTodoById(numericId);
  })

  toggleCompleted() {
    const todo = this.todo()||undefined;
    this.todoService.updateTodoStatus(todo)
  }

  goBack(){
    this.router.navigateByUrl('/');
  }

  setPriority(priority: 'Low' | 'Medium' | 'High' | undefined) {
    this.todoService.setPriority(priority, this.todo()?.id)
  }
}
