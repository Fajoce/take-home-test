import { ListLoanComponent } from './components/list-loan/list-loan.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: ListLoanComponent
  },
  {
    path: 'loan/:id',
    component: ListLoanComponent
  }
];
