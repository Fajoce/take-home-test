import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoanService } from './services/loan-service';
import { Loan } from './models/loan';
import { ListLoanComponent } from "./components/list-loan/list-loan.component";
import { LoginComponentComponent } from './components/login-component/login-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
 
}
