import { Injectable } from '@angular/core';
import { DataService } from '../dataServices/data-service';
import { Expense } from 'src/app/models/expense.model';


@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  constructor(private dataService: DataService){
  }

  private expenseArray: Expense[] = [];

  getExpenses():Promise<Expense[]> {
    return this.dataService.getExpenses();
  }

  addExpense(expense: Expense):Promise<void> {
    return this.dataService.addExpense(expense);
  }

  deleteExpense(expense:number):Promise<void>{
    return this.dataService.deleteExpense(expense)
  }

  async getTotalExpenses():Promise< number >{
    const expenses = await this.getExpenses();
    return expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }
  
}
