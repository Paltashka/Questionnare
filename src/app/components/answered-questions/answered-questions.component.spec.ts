import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredQuestionsComponent } from './answered-questions.component';

describe('AnsweredQuestionsComponent', () => {
  let component: AnsweredQuestionsComponent;
  let fixture: ComponentFixture<AnsweredQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsweredQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsweredQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
