import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoStatisticsComponent } from './todo-statistics.component';

describe('TodoStatisticsComponent', () => {
  let component: TodoStatisticsComponent;
  let fixture: ComponentFixture<TodoStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
