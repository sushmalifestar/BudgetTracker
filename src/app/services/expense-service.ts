import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { DataService } from './data-service';

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

  async getTotalExpenses():Promise< number >{
    const expenses = await this.getExpenses();
    return expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }
  
}
