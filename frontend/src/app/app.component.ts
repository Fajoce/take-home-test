import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoanService } from './services/loan-service';
import { Loan } from './models/loan';
import { ListLoanComponent } from "./components/list-loan/list-loan.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule, ListLoanComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
 displayedColumns = [
  'amount',
  'currentBalance',
  'applicantName',
  'status'
];

  loans: Loan[] = [];

  constructor(
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {

    this.loanService
      .getAll()
      .subscribe({
        next: (response) => {
          this.loans = response;
        },
        error: (error) => {
          console.error(
            'Error loading loans',
            error
          );
        }
      });
  }
    getStatus(status: number): string {
  return status === 0 ? 'Activo' : 'Pagado';
}
}
