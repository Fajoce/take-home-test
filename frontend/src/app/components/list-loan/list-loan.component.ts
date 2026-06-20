import { Component } from '@angular/core';
import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-loan',
  imports: [CommonModule],
  templateUrl: './list-loan.component.html',
  styleUrl: './list-loan.component.scss'
})
export class ListLoanComponent {
loans: Loan[] = [];

  constructor(
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getAll().subscribe({
      next: (response) => {
        this.loans = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  getStatus(status: number): string {
  return status === 0 ? 'Activo' : 'Pagado';
}
}
