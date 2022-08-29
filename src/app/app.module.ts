import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/shared/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionListComponent } from './components/question-list/question-list.component';
import {ModalFormComponent} from "./modal-form/modal-form.component";
import { AnsweredQuestionsComponent } from './components/answered-questions/answered-questions.component';
import { UnansweredQuestionsComponent } from './components/unanswered-questions/unanswered-questions.component';
import { QuestionComponent } from './components/questions/question.component';
import {QuestionService} from "./question.service";
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    ModalFormComponent,
    QuestionListComponent,
    AnsweredQuestionsComponent,
    UnansweredQuestionsComponent,
    QuestionComponent,
    HeaderComponent,
    MainComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
