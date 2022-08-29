import { Component, OnInit } from '@angular/core';
import { Question } from 'src/interface/question';
import { MatDialog } from '@angular/material/dialog';
import {ModalFormComponent} from 'src/app/modal-form/modal-form.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
 public openState: boolean = false;
 public questionList: Question[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    if (!localStorage.getItem('questions')) {
      this.setDataOnLocalStorage();
    }
    this.getQuestions();
  }

 public setDataOnLocalStorage(): void  {
    const questionList: Question[] = [
      {
        id: 1,
        text: 'When Nikola Tesla was born',
        type: 'Single choice',
        options: ['1856', '1860', '1920'],
        creationDate: new Date().toLocaleDateString(),
        isOpen: false,
        answer: '1856',
      },
      {
        id: 2,
        text: 'Select European countries',
        type: 'Multiple choice',
        options: ['Germany', 'Egypt', 'Sweden'],
        creationDate: new Date().toLocaleDateString(),
        isOpen: true,
        answer: 'Germany, Sweden',
      },
      {
        id: 3,
        text: 'How many will be 1 + 1',
        type: 'Open question',
        creationDate: new Date().toLocaleDateString(),
        isOpen: true,
        answer: '2',
      },
    ];
    localStorage.setItem('questions', JSON.stringify(questionList));
  }

 public addNewQuestion(): void {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      minHeight: '400px',
      width: '800px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.setItem('questions', JSON.stringify(result));
        this.questionList = result;
      }
    });
  }
  public editQuestion(question: Question): void {
    const dialogRef = this.dialog.open(ModalFormComponent, {
      minHeight: '400px',
      width: '800px',
      data: question,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.setItem('questions', JSON.stringify(result));
        this.questionList = result;
      }
    });
  }
 public deleteQuestion(questionId: number): void {
    let data = JSON.parse(localStorage.getItem('questions') || '[]');
    data = data.filter((question: Question) => question.id !== questionId);
    localStorage.setItem('questions', JSON.stringify(data));
    this.questionList = data;
  }

 public getQuestions(): void {
    const data = JSON.parse(localStorage.getItem('questions') || '[]');
    this.questionList = data;
  }
}
