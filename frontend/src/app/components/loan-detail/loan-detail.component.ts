import { Component } from '@angular/core';
import { Loan } from '../../models/loan';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoanService } from '../../services/loan-service';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-loan-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss'],
})
export class LoanDetailComponent {
  loan?: Loan;

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadLoan();
  }

  loadLoan(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loanService.getById(id).subscribe({
      next: (response) => {
        this.loan = response;
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  openPaymentDialog(): void {
    console.log('CLICK');
    if (!this.loan) {
      return;
    }

    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((amount: number) => {
      if (!amount) {
        return;
      }

      this.loanService.applyPayment(this.loan!.id, amount).subscribe({
        next: () => {
          this.snackBar.open('Pago registrado correctamente', 'Cerrar', {
            duration: 3000,
          });

          this.loadLoan();
        },

        error: (error) => {
          console.error(error);

          this.snackBar.open('Error registrando el pago', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    });
  }
}
