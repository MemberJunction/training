import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NewSubmission } from './new-submission/new-submission.component';
import { SubmissionsList } from './submissions-list/submissions-list.component';
import { ReviewsList } from './reviews-list/reviews-list.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Home' }
  },
  { 
    path: 'new',
    component: NewSubmission,
  },
  { 
    path: 'submissions-list',
    component: SubmissionsList
  },
  {
    path: 'reviews',
    component: ReviewsList
  },
  { 
    path: 'no-access',
    component: NoAccessComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule] 
})
export class AppRoutingModule {}
