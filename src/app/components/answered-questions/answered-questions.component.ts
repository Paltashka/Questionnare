import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../interface/question";
import {QuestionService} from "../../question.service";

@Component({
  selector: 'app-answered-questions',
  templateUrl: './answered-questions.component.html',
  styleUrls: ['./answered-questions.component.scss']
})
export class AnsweredQuestionsComponent implements OnInit {

  public answeredQuestions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions();
    this.getQuestions();
  }

  public getQuestions(): void {
    this.questionService.questionArray$.subscribe((data: Question[])=>{
      this.answeredQuestions = data.filter(
        (question: Question) => !question.isOpen
      );
    })
  }
}
