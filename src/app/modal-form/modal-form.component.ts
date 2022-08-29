import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {COMMA, ENTER, TAB} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Question } from '../../interface/question';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
 public questionForm: FormGroup;
 public questionType: string[] = [
    'Single choice',
    'Multiple choice',
    'Open question',
  ];
 public answerOptions: any = [];
 public isOpenQuestion: boolean = false;
 public isAnswerOptions: boolean = false;
 public isEdit: boolean = false;
public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    public dialogRef: MatDialogRef<ModalFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  private initUserForm(): void {
    this.questionForm = this.fb.group({
      text: '',
      type: '',
      options: '',
      answer: '',
    });

    // this.questionForm?.valueChanges.subscribe(()=> {
    //
    //   console.log(this.questionForm.invalid)
    //   if (this.isOpenQuestion && !this.answerOptions.length){
    //     // this.questionForm.setErrors({invalidAnswerOptions:true})
    //
    //   }
    // })
  }

  ngOnInit(): void {
    this.checkForm();
  }

  private initUserFormWithValue(): void {
    if (this.data.type !== 'Open question') {
      this.isOpenQuestion = true;
    }
    this.data.options
      ? (this.answerOptions = this.data.options)
      : this.answerOptions;

    this.questionForm = this.fb.group({
      text: this.data.text,
      type: this.data.type,
      options: '',
      answer: this.data.answer,
      your_answer: []
    });
  }

 public addNewQuestion(): void {
   this.questionForm.value.options = this.answerOptions;
   console.log(this.questionForm)
    if (this.questionForm.valid) {
      const currentData = JSON.parse(localStorage.getItem('questions') || '[]');
      currentData.unshift({
        id: Math.floor(Math.random() * (1000 - 4)) + 4,
        creationDate: new Date().toLocaleDateString(),
        isOpen: true,
        ...this.questionForm.value,
      });
      this.dialogRef.close(currentData);
      console.log(currentData)
    }
  }

 public checkQuestionType(e?: any): void {
   if (e.target.innerHTML.trim() === 'Open question') {
      this.isOpenQuestion = false;
      return;
    }

   if(!this.answerOptions.length){
     // this.questionForm.setErrors({invalidAnswerOptions:true})
     this.isAnswerOptions = true;
     console.log(this.questionForm.invalid);
   }
    this.isOpenQuestion = true;
  }

  public inputAnswerOption(): void{
    if (this.answerOptions.length){
      this.isAnswerOptions=false
      console.log(this.isAnswerOptions);
      return;
    }
    this.isAnswerOptions=true

    console.log(232534)

    // this.questionForm.setErrors({invalidAnswerOptions:true})
  }

  public removeOption(answerOptions: string): void {
    const index = this.answerOptions.indexOf(answerOptions);

    if (index >= 0) {
      this.answerOptions.splice(index, 1);
    }
  }

 public addOption(event: MatChipInputEvent): void {
   console.log(this.answerOptions)
   console.log(event);
   if (this.answerOptions.length){
     // this.questionForm.setErrors(null)
     console.log(this.questionForm.errors);
   }
   const value = (event.value || '').trim();
    if (value) {
      this.answerOptions.unshift(value);
    }
   event.chipInput!.clear();
  }

 private checkForm(): void {

    if (this.data) {
      this.initUserFormWithValue();
      this.isEdit = true;
      return;
    }
    this.initUserForm();
  }

 public editQuestion(): void {
   if (this.questionForm.valid){
     this.questionForm.value.options = this.answerOptions;
     const question = {
       id: this.data.id,
       creationDate: this.data.creationDate,
       ...this.questionForm.value,
       isOpen: this.data.isOpen
     };
     const data = JSON.parse(localStorage.getItem('questions') || '[]');
     const currentQuestion = data.findIndex(
       (item: Question) => item.id === question.id
     );
     data.splice(currentQuestion, 1, question);
     this.dialogRef.close(data);
   }
   }

}
