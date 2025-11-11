import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoQuotesComponent } from './todo-quotes.component';

describe('TodoQuotesComponent', () => {
  let component: TodoQuotesComponent;
  let fixture: ComponentFixture<TodoQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoQuotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
