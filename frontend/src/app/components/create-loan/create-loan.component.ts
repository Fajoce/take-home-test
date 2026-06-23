import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoanService } from '../../services/loan-service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-loan',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.scss']
})
export class CreateLoanComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      applicantName: ['', Validators.required],

      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loan = {
      applicantName: this.form.value.applicantName,

      amount: Number(this.form.value.amount),

      currentBalance: Number(this.form.value.amount),

      status: 0,
    };

    this.loanService.create(loan).subscribe({
      next: () => {
        this.snackBar.open('Préstamo creado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/loans']);
      },
    });
  }
}
