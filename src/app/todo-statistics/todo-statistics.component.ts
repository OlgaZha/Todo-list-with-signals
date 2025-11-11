import {Component, inject} from '@angular/core';
import {TodoServiceService} from '../todo-service.service';

@Component({
  selector: 'app-todo-statistics',
  imports: [],
  templateUrl: './todo-statistics.component.html',
  styleUrl: './todo-statistics.component.scss'
})


export class TodoStatisticsComponent {
readonly todoService = inject(TodoServiceService)
}
