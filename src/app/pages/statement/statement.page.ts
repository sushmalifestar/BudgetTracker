import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent,IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { IncomeService } from 'src/app/services/incomeServices/income-service';
import { ExpenseService } from 'src/app/services/expenseServices/expense-service';
import { SavingsService } from 'src/app/services/savingsServices/savings-service';
import { StatementItem } from 'src/app/models/statement.model';
import { DashboardLinkComponent } from 'src/app/components/dashboard-link/dashboard-link.component';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent,IonButtons, IonBackButton, DashboardLinkComponent]
})
export class StatementPage implements OnInit {

  constructor(private incomeService:IncomeService, private expenseService:ExpenseService, private savingService: SavingsService) { }

  statementList : StatementItem []=[];

  async ngOnInit() {

    const incomes = await this.incomeService.getIncome();
    const expenses = await this.expenseService.getAllExpenses();
    const savings = await this.savingService.getAllSavings();
  
    const incomeItems: StatementItem[] = incomes.map(item => ({
      type: 'income',
      title: item.title,
      amount: item.amount,
      date: item.incomeDate
    }));
  
    const expenseItems: StatementItem[] = expenses.map(item => ({
      type: 'expense',
      title: item.title,
      amount: item.amount,
      date: item.expenseDate
    }));
  
    const savingItems: StatementItem[] = savings.map(item => ({
      type: 'saving',
      title: item.title,
      amount: item.amount,
      date: item.savingsDate
    }));
  
    this.statementList = [
      ...incomeItems,
      ...expenseItems,
      ...savingItems
    ];
  
    this.statementList.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  
    console.log("this is the statement list", this.statementList);

  }

}
