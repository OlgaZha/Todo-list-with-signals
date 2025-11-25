import {Component, effect, inject, signal} from '@angular/core';
import {TodoServiceService} from '../todo-service.service';

@Component({
  selector: 'app-todo-quotes',
  imports: [],
  templateUrl: './todo-quotes.component.html',
  styleUrl: './todo-quotes.component.scss'
})
export class TodoQuotesComponent {
  todoService = inject(TodoServiceService)
  constructor() {
    effect(() => {
      if(this.todoService.motivationEvents() > 0) {
        this.showRandomQuote()
      }
    });
  }
  randomQuote = signal<string>('Don’t wait for opportunity — create it.')
  quotes = [
      "Success doesn’t come from what you do occasionally, it comes from what you do consistently.",
      "Discipline is choosing what you want most over what you want now.",
      "Your only limit is the amount of action you’re willing to take.",
      "",
      "Every day is a new chance to become a better version of yourself.",
      "Small steps in the right direction become giant leaps over time.",
      "Dream big, start small, but most importantly, start.",
      "You don’t have to be great to start, but you have to start to be great.",
      "Push yourself because no one else is going to do it for you.",
      "The harder you work for something, the greater you’ll feel when you achieve it."
    ]
  showRandomQuote() {
    const id = Math.floor(Math.random() * this.quotes.length);
    return this.randomQuote.set(this.quotes[id]);
  }
}
