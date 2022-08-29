import { Component, OnInit } from '@angular/core';
import {Question} from "../../../interface/question";
import {QuestionService} from "../../question.service";

@Component({
  selector: 'app-unanswered-questions',
  templateUrl: './unanswered-questions.component.html',
  styleUrls: ['./unanswered-questions.component.scss']
})
export class UnansweredQuestionsComponent implements OnInit {

  public unansweredQuestions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions();
    this.getQuestions();
  }

public getQuestions(): void {
  this.questionService.questionArray$.subscribe((data: Question[])=> {
    this.unansweredQuestions = data.filter(
      (question: Question) => question.isOpen );
  })
}
}
