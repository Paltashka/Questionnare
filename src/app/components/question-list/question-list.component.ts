import { Component, OnInit } from '@angular/core';
import { Question } from 'src/interface/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
 public arr: any[] = [];
 public answeredQuestions: Question[] = [];
 public unansweredQuestions: Question[] = [];
 public selectedAnswer: string = ''

  constructor() {}

  ngOnInit(): void {
    if (!localStorage.getItem('questions')) {
      this.setDataOnLocalStorage();
    }
    this.getQuestions();
  }

 public setDataOnLocalStorage(): void {
    const questionList: Question[] = [
      {
        id: 1,
        text: 'When Nikola Tesla was born',
        type: 'Single choice',
        options: ['1856', '1860', '1920'],
        creationDate: new Date().toLocaleDateString(),
        isOpen: true,
        answer: '1856',
        your_answer: []
      },
      {
        id: 2,
        text: 'Select European countries',
        type: 'Multiple choice',
        options: ['Germany', 'Egypt', 'Sweden'],
        creationDate: new Date().toLocaleDateString(),
        isOpen: true,
        answer: 'Germany, Sweden',
        your_answer: []
      },
      {
        id: 3,
        text: 'How many will be 1 + 1',
        type: 'Open question',
        creationDate: new Date().toLocaleDateString(),
        isOpen: true,
        answer: '2',
        your_answer: []
      },
    ];
    localStorage.setItem('questions', JSON.stringify(questionList));
  }

 public getQuestions(): void {
    JSON.parse(localStorage.getItem('questions') || '[]');

  }

}
