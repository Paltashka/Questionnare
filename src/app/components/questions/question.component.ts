import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../interface/question";
import {QuestionService} from "../../question.service";
import {BehaviorSubject, interval} from "rxjs";
import {debounce} from "rxjs/operators";

@Component({
  selector: 'app-questions',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question ;
  public selectedAnswer: string[] = [];
  public event: any;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
  }

  public answer(elem: Question): void {
    elem.isOpen = false;
    elem.your_answer = this.selectedAnswer;
    const data = JSON.parse(localStorage.getItem('questions') || '[]');
    const index = data.findIndex(
      (question: Question) => question.id === elem.id
    );
    data.splice(index, 1, elem);
    localStorage.setItem('questions', JSON.stringify(data));
    this.questionService.questionArray$.next(data)

  }

  public toUnansered(elem: Question): void {
    elem.isOpen = true;
    elem.your_answer = [];
    const data = JSON.parse(localStorage.getItem('questions') || '[]');
    const index = data.findIndex(
      (question: Question) => question.id === elem.id
    );
    data.splice(index, 1, elem);
    localStorage.setItem('questions', JSON.stringify(data));
    this.questionService.questionArray$.next(data);
  }


 public checkCheckBoxvalue(option: string, event: any): void {
    if (!this.selectedAnswer.includes(option)) {
      this.selectedAnswer.push(option)
    }
    if (!event.checked && this.selectedAnswer.includes(option)) {
      this.selectedAnswer = this.selectedAnswer.filter((answer) => answer !== option)
    }

  }

 public checkRadioValue(option: string): void {
    this.selectedAnswer = [option];

  }

 public checkInput(event: any): void {
    this.event = event
      this.selectedAnswer = event.target.value
   console.log(this.selectedAnswer);
 }
}
