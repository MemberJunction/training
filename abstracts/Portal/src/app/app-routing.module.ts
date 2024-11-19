import { NgModule } from '@angular/core';
import { RouterModule, Routes, NavigationEnd } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NoAccessComponent } from './no-access/no-access.component';
import { BreadcrumbService } from './breadcrumb.service';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    data: { breadcrumb: 'Home' }
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
