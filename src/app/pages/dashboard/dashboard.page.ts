import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone:true,
  imports: [IonContent,
    CommonModule,
    IonCard,
    IonGrid,
  IonCol,
  IonRow,
    IonCardContent
  ],
})
export class DashboardPage {

  totalIncome = 0;
  totalExpenses = 0;
  totalSavings=0;
  balance = 0;

  constructor( private inService : IncomeService, 
    private exService: ExpenseService,
    private savingsService :SavingsService,
     private router:Router, 
  ) {
   }

   ionViewWillEnter() {
    this.calculate();
  }

  async calculate() {
    this.totalIncome = Number(await this.inService.getTotalIncome());
    this.totalExpenses= Number(await this.exService.getTotalExpenses());
    this.totalSavings = Number( await  this.savingsService.getTotalSavings());

//     const rawIncome = await this.inService.getTotalIncome();
// console.log('RAW INCOME FROM SERVICE:', rawIncome, typeof rawIncome);

//     this.totalIncome = Number(
//       String(await this.inService.getTotalIncome()).replace(/,/g, '')
//     );
  
//     this.totalExpenses = Number(
//       String(await this.exService.getTotalExpenses()).replace(/,/g, '')
//     );
  
//     this.totalSavings = Number(
//       String(await this.savingsService.getTotalSavings()).replace(/,/g, '')
//     );
    this.balance=this.totalIncome-this.totalExpenses- this.totalSavings;
  }

  goToIncome() {
    this.router.navigate(['/tabs/income']);
  }

  goToExpense() {
    this.router.navigate(['/tabs/expenses']);
  }
  goToSavings(){
    this.router.navigate(['/tabs/savings'])
  }

  formatAmount(amount: number): string {
    if (amount >= 10000000) {
      return (amount / 10000000).toFixed(2).replace(/\.00$/, '') + ' Cr';
    }
  
    if (amount >= 100000) {
      return (amount / 100000).toFixed(2).replace(/\.00$/, '') + ' L';
    }
  
    return amount.toLocaleString('en-IN');
  }

}
