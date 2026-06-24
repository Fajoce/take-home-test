import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoanService } from '../../services/loan-service';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BaseChartDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  totalLoans = 0;
  activeLoans = 0;
  paidLoans = 0;

  totalAmount = 0;
  recoveredAmount = 0;

  constructor(
    private loanService: LoanService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }
  loadDashboard(): void {
    this.loanService.getAll().subscribe({
      next: (loans) => {
        this.totalLoans = loans.length;
        this.activeLoans = loans.filter((x) => x.status === 0).length;
        this.paidLoans = loans.filter((x) => x.status !== 0).length;

        this.totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);

        this.recoveredAmount = loans.reduce(
          (sum, loan) => sum + (loan.amount - loan.currentBalance),
          0,
        );
        this.pieChartData = {
          labels: ['Activos', 'Pagados'],
          datasets: [
            {
              data: [this.activeLoans, this.paidLoans],
            },
          ],
        };

        this.barChartData = {
          labels: ['Prestado', 'Recuperado', 'Pendiente'],
          datasets: [
            {
              data: [
                this.totalAmount,
                this.recoveredAmount,
                this.totalAmount - this.recoveredAmount,
              ],
            },
          ],
        };
      },
    });
  }
  goToDashboard(): void {
    if (this.router.url === '/dashboard') {
      this.loadDashboard();

      return;
    }

    this.router.navigate(['/dashboard']);
  }
  goToLoans(): void {
    this.router.navigate(['/loans']);
  }
  public pieChartType: ChartType = 'pie';

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Activos', 'Pagados'],
    datasets: [
      {
        data: [0, 0],
      },
    ],
  };

  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Prestado', 'Recuperado', 'Pendiente'],
    datasets: [
      {
        data: [0, 0, 0],
      },
    ],
  };
}
