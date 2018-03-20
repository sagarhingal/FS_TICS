import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserXhr } from '@angular/http';
import { Cors } from './cors';

import { DataService } from './services/data.service';
import { CandidDataService } from './services/candid-data.service';
import { QuestionsComponent } from './questions/questions.component';
import { TestComponent } from './test/test.component';
import { ReviewComponent } from './review/review.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubmitTestComponent } from './submit-test/submit-test.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CandidLoginComponent } from './candid-login/candid-login.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { RecruiterLoginComponent } from './recruiter-login/recruiter-login.component';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
  {
    path: 'test',
    component: TestComponent,
    data: { title: 'Create a Test' }
  },
  {
    path: 'questions',
    component: QuestionsComponent,
    data: { title: 'Add or View Questions' }
  },
  {
    path: 'login',
    component: RecruiterLoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'thanks',
    component: ThankYouComponent,
    data: { title: 'Thanks!' }
  },
  {
    path: 'review',
    component: ReviewComponent,
    data: { title: 'Review' }
  },
  {
    path: 'tics/:id/:name',
    component: NavbarComponent,
    data: { title: 'TICS' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'welcome-candid',
    component: CandidLoginComponent,
    data: { title: 'Welcome Candidate' }
  },
  {
    path: 'welcome-candid/test/:id',
    component: SubmitTestComponent,
    data: { title: 'Submit Test' }
  },
  { path: '',
    component: RecruiterLoginComponent,
    data: { title: 'Login' }
  }

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuestionsComponent,
    TestComponent,
    ReviewComponent,
    DashboardComponent,
    SubmitTestComponent,
    ThankYouComponent,
    CandidLoginComponent,
    InstructionsComponent,
    RecruiterLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
        // <-- debugging purposes only
    )
  ],
  providers: [
    {provide: BrowserXhr, useClass: Cors}, // <--------- For Cross Origin Access
    DataService,    // <----- Data Service
    CandidDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
