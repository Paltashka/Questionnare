import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnansweredQuestionsComponent } from './unanswered-questions.component';

describe('UnansweredQuestionsComponent', () => {
  let component: UnansweredQuestionsComponent;
  let fixture: ComponentFixture<UnansweredQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnansweredQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnansweredQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
