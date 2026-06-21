import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan-service';

@Component({
  selector: 'app-list-loan',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './list-loan.component.html',
  styleUrls: ['./list-loan.component.scss']
})
export class ListLoanComponent implements OnInit {

  loading = true;

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

    this.loading = true;

    this.loanService.getAll().subscribe({
      next: (response) => {

        setTimeout(() => {

          this.loans = response;
          this.loading = false;

        }, 4000);

      },
      error: (error) => {

        console.error(error);
        this.loading = false;

      }
    });
  }

  getStatus(status: number): string {
    return status === 0 ? 'Activo' : 'Pagado';
  }
}