import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private expenseArray: Expense[] = [];

  getExpenses(): Expense[] {
    return this.expenseArray;
  }

  addExpense(expense: Expense) {
    this.expenseArray.push(expense);
  }

  getTotalExpenses(): number {
    return this.expenseArray.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }
  
}
