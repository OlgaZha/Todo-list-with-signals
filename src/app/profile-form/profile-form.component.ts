import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TodoServiceService} from '../todo-service.service';

@Component({
  selector: 'app-profile-form',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent {
readonly todoService = inject(TodoServiceService)

  onSubmitForm() {

  }
}
