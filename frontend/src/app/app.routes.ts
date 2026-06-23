import { ListLoanComponent } from './components/list-loan/list-loan.component';
import { Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { LoanDetailComponent } from './components/loan-detail/loan-detail.component';
import { CreateLoanComponent } from './components/create-loan/create-loan.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponentComponent
  },

  {
    path: 'loans',
    component: ListLoanComponent,
    canActivate: [authGuard]
  },
    {
  path: 'loan/create',
  component: CreateLoanComponent,
   canActivate: [authGuard]
},
    {
    path: 'loan/:id',
    component: LoanDetailComponent,
     canActivate: [authGuard]
  },
  {
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
];
