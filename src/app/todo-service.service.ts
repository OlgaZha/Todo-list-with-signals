import {computed, effect, Injectable, Signal, signal} from '@angular/core';
import {FormBuilder, FormControl, FormControlStatus, FormGroup, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';

export interface Todo {
  text: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private todos = signal<Todo[]>([]);
  externalTodos = this.todos.asReadonly();
  filter = signal<'all' | 'active' | 'completed'>('all')
  remainingList  = computed(() => this.todos().filter(todo => !todo.isCompleted));
  completedList = computed(() => this.todos().filter(todo => todo.isCompleted));
  filteredTodo =  computed(() => {
    switch(this.filter()) {
      case 'active': return this.todos().filter(todo => !todo.isCompleted);
      case 'completed': return this.todos().filter(todo => todo.isCompleted);
      default: return this.todos();
    }
  })
  readonly profileForm: FormGroup;
  readonly nameSignal: Signal<string>;
  readonly emailSignal: Signal<string>;
  readonly profileStatusSignal: Signal<FormControlStatus>;
  constructor(private fb: FormBuilder) {
    effect(() => {
      localStorage.setItem('todos', JSON.stringify(this.todos()));
    })
    const localTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
    if(localTodos.length > 0) {
      this.todos.update(() => localTodos);
    }

    this.profileForm = this.buildProfileForm();
    this.nameSignal = this.toSignalWithInitial('name');
    this.emailSignal = this.toSignalWithInitial('email');
    this.profileStatusSignal = toSignal(this.profileForm.statusChanges, {initialValue: this.profileForm.status})
  }

  addToDo(newTodo: Todo) {
    this.todos.update(list => [...list, newTodo]);
  }

  updateTodoStatus(todo: Todo){
    this.todos.update(todos => {
      todo.isCompleted = !todo.isCompleted;
      return [...todos];
    })
  }

  setFilter(value: any) {
    this.filter.set(value)
  }

  removeToDo(inputIndex: number): void {
    this.todos.update(list => list.filter((element, index) => index !== inputIndex));
  }
  clearAll(): void {
    this.todos.set([])
  }

  buildProfileForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  toSignalWithInitial(controlName: string): Signal<string> {
    let control = this.profileForm.get(controlName)!;
    return toSignal(control.valueChanges, {initialValue: control.value});
  }
}
