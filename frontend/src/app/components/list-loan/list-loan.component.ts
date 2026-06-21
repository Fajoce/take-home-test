import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan-service';

@Component({
  selector: 'app-list-loan',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './list-loan.component.html',
  styleUrls: ['./list-loan.component.scss']
})
export class ListLoanComponent {

  displayedColumns: string[] = [
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