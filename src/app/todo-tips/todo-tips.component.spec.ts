import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTipsComponent } from './todo-tips.component';

describe('TodoTipsComponent', () => {
  let component: TodoTipsComponent;
  let fixture: ComponentFixture<TodoTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
