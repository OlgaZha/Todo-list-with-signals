import {computed, effect, Injectable, Signal, signal} from '@angular/core';
import {FormBuilder, FormControl, FormControlStatus, FormGroup, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {Todo} from './models';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  private todos = signal<Todo[]>([]);

  lastAddedTodo = signal<Todo | null>(null);

  motivationEvents = signal(0);

  lastId = 0;
  previousLength = 0;
  addFinal = 0;

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

    this.registerMotivationEffect()
  }

  addToDo(newTodo: Partial<Todo>) {
    let todo: Todo = {
      id: ++this.lastId,
      text: newTodo.text ?? '',
      isCompleted: false,
      subtasks: ['task1', 'task2', 'task3'],
      priority: "Low"
    }
    this.todos.update(list => [...list, todo]);
    this.lastAddedTodo.set(todo);
  }

  updateTodoStatus(todo: Todo| undefined){
    if(todo) {
      this.todos.update(copyTodos => {
        return copyTodos.map(t => t.id === todo.id ? {...t, isCompleted: !t.isCompleted} : t)
      })
    }
  }

  getTodoById(id: number): Todo | undefined {
    return this.todos().find(todo => todo.id === id)
  }

  setFilter(value: any) {
    this.filter.set(value)
  }

  setPriority(priority: 'Low' | 'Medium' | 'High' | undefined, id?: number) {
    this.todos.update(todos => {
      const editedTodo = todos.find(todo => todo.id === id);
      if(editedTodo) {
        editedTodo.priority = priority
      }
      return [...todos];
    })
  }

  removeToDo(inputIndex: number): void {
    this.todos.update(list => list.filter((element, index) => index !== inputIndex));
  }
  clearAll(): void {
    this.todos.set([]);
    this.lastAddedTodo.set(null);
  }

  addNewSubtask(id: number | undefined, addedSubtask: string): void {
    this.todos.update(todos => {
      const todo = todos.find(element => element.id === id)
      if(todo) {
        todo.subtasks?.push(addedSubtask);
      }
      return [...todos];
    })
  }

  private registerMotivationEffect() {
    effect(() => {
      let todos = this.todos();
      let currentLength = todos.length;
      if(currentLength > this.previousLength) {
        let lastTodo = todos[currentLength - 1];
        if(lastTodo && !lastTodo.isCompleted) {
          this.addFinal++;
          if(this.addFinal === 3) {
            this.motivationEvents.update(n => n+1)
            this.addFinal = 0;
          }
        } else {
          this.addFinal = 0;
        }
      } else {
        this.addFinal = 0;
      }
      this.previousLength = currentLength;
    });
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
