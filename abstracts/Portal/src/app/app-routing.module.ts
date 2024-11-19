import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NewSubmission } from './new-submission/new-submission.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Home' }
  },
  { 
    path: 'new',
    component: NewSubmission,
    data: { breadcrumb: 'new' }
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
