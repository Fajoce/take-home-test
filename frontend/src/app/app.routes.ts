import { ListLoanComponent } from './components/list-loan/list-loan.component';
import { Routes } from '@angular/router';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { LoanDetailComponent } from './components/loan-detail/loan-detail.component';

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
    component: ListLoanComponent
  },
    {
    path: 'loan/:id',
    component: LoanDetailComponent
  }

];
