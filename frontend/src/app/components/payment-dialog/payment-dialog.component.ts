import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './payment-dialog.component.html'
})
export class PaymentDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef:
      MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {

    this.form = this.fb.group({

      amount: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ]

    });

  }

  save(): void {

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(
      this.form.value.amount
    );

  }

}
