import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';

import {
  MatPaginator,
  MatPaginatorModule
} from '@angular/material/paginator';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan-service';

@Component({
  selector: 'app-list-loan',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
   MatToolbarModule
  ],
  templateUrl: './list-loan.component.html',
  styleUrls: ['./list-loan.component.scss']
})
export class ListLoanComponent
  implements OnInit, AfterViewInit {

  loading = true;

  displayedColumns: string[] = [
    'id',
    'amount',
    'paidAmount',
    'currentBalance',
    'applicantName',
    'status',
    'actions'
  ];

  dataSource =
    new MatTableDataSource<Loan>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private loanService: LoanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator =
      this.paginator;
  }

  loadLoans(): void {

    this.loading = true;

    this.loanService
      .getAll()
      .subscribe({

        next: (response) => {

          setTimeout(() => {

            this.dataSource.data =
              response;

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
      filterValue
        .trim()
        .toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource
        .paginator
        .firstPage();

    }
  }

  getStatus(status: number): string {
    return status === 0
      ? 'Activo'
      : 'Pagado';
  }
  logout(): void {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}
}