import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonGrid,
  IonCol,
  IonRow,
  IonCardContent
} from '@ionic/angular/standalone';
import { ExpenseService } from 'src/app/services/expenseServices/expense-service';
import { IncomeService } from 'src/app/services/incomeServices/income-service';
import { SavingsService } from 'src/app/services/savingsServices/savings-service';
import { FormatAmountPipe } from 'src/app/pipes/format-amount-pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: true,
  imports: [IonContent,
    CommonModule,
    IonCard,
    IonGrid,
    IonCol,
    IonRow,
    IonCardContent,
    FormatAmountPipe
  ],
})
export class DashboardPage {

  totalIncome = 0;
  totalExpenses = 0;
  totalSavings = 0;
  balance = 0;

  constructor(private inService: IncomeService,
    private exService: ExpenseService,
    private savingsService: SavingsService,
    private router: Router,
  ) {
  }

  ionViewWillEnter() {
    this.calculate();
  }

  async calculate() {
    this.totalIncome = Number(await this.inService.getTotalIncome());
    this.totalExpenses = Number(await this.exService.getTotalExpenses());
    this.totalSavings = Number(await this.savingsService.getTotalSavings());
    this.balance = this.totalIncome - this.totalExpenses - this.totalSavings;
  }

  goToIncome() {
    this.router.navigate(['/tabs/income']);
  }

  goToExpense() {
    this.router.navigate(['/tabs/expenses']);
  }
  goToSavings() {
    this.router.navigate(['/tabs/savings'])
  }

  goToStatement() {
    this.router.navigate(['/tabs/statement']);
  }



}
