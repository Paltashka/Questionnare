import {Question} from "../interface/question";
import {BehaviorSubject} from "rxjs";

export class QuestionService {
  private questions: Question[] = [];
  public questionArray$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);

  public getQuestions(): void {
    const data = JSON.parse(localStorage.getItem('questions') || '[]');
    this.questionArray$.next(data)
  }
}
