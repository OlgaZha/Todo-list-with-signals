import { Routes } from '@angular/router';
import {TodoDetailsComponent} from './todo-details/todo-details.component';
import {ToDoComponent} from './to-do/to-do.component';

export const routes: Routes = [
  { path: '', component: ToDoComponent },
  {path: 'todo/:id', component: TodoDetailsComponent},
];
