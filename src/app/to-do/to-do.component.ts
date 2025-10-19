import {Component, computed, effect, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

interface Todo {
  text: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-to-do',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})

export class ToDoComponent {
  todos = signal<Todo[]>([]);
  newTodo: Todo = {
    text: '',
    isCompleted: false,
  };
  filter = signal<'all' | 'active' | 'completed'>('all')
  remainingCount  = computed(() => this.todos().filter(todo => !todo.isCompleted));
  completedCount = computed(() => this.todos().filter(todo => todo.isCompleted));
  filteredTodo =  computed(() => {
    switch(this.filter()) {
      case 'active': return this.todos().filter(todo => !todo.isCompleted);
      case 'completed': return this.todos().filter(todo => todo.isCompleted);
      default: return this.todos();
    }
  })

  constructor() {
    effect(() => {
      localStorage.setItem('todos', JSON.stringify(this.todos()));
    })
    const localTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    if(localTodos.length > 0) {
      this.todos.update(() => localTodos);
    }
  }

  addToDo() {
    this.todos.update(list => [...list, this.newTodo]);
    this.newTodo = {
      text: '',
      isCompleted: false,
    };
  }

  updateTodoStatus(todoId: number){
    this.todos.update(todos => {
      todos[todoId].isCompleted = !todos[todoId].isCompleted;
      return [...todos];
    })
  }

  removeToDo(inputIndex: number): void {
    this.todos.update(list => list.filter((element, index) => index !== inputIndex));
  }
  clearAll(): void {
    this.todos.set([])
  }
}
