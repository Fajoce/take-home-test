import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-list-loan',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './list-loan.component.html',
  styleUrls: ['./list-loan.component.scss'],
})
export class ListLoanComponent implements OnInit {
  loading = true;

  displayedColumns: string[] = [
    'id',
    'amount',
    'paidAmount',
    'currentBalance',
    'applicantName',
    'status',
  ];

  dataSource = new MatTableDataSource<Loan>([]);

  constructor(private loanService: LoanService) {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
  this.loading = true;
  this.loanService.getAll().subscribe({
    next: (response) => {
      setTimeout(() => {
        this.dataSource.data = response;
        this.dataSource.paginator =
          this.paginator;
        this.loading = false;
      }, 1000);
    },
    error: (error) => {
      console.error(error);
      this.loading = false;
    }
  });
}
applyFilter(event: Event): void {

  const filterValue =
    (event.target as HTMLInputElement)
      .value;

  this.dataSource.filter =
    filterValue.trim().toLowerCase();

}
  getStatus(status: number): string {
    return status === 0 ? 'Activo' : 'Pagado';
  }
}
