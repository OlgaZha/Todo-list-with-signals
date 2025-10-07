import {Component, computed, effect, signal} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-to-do',
  imports: [
    NgIf
  ],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent {
  todos = signal<string[]>([]);
  remainingCount = computed(() => this.todos().length);
  newTodo = '';
  constructor() {
    effect(() => console.log(this.todos()))
  }

  addToDo() {
    this.todos.update(list => [...list, this.newTodo]);
    this.newTodo = '';
  }
  removeToDo(inputIndex: number): void {
    this.todos.update(list => list.filter((element, index) => index !== inputIndex));
  }

}
