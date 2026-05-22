import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Expense } from 'src/app/models/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {

  private baseUrl = 'http://localhost:3000/expenses';

  constructor(private http: HttpClient) {}

  async getExpenses(): Promise<Expense[]> {
    const res: any = await firstValueFrom(
      this.http.get(this.baseUrl)
    );

    return res.data.map((row: any) => ({
      id: row.id,
      amount: row.amount,
      title: row.title,   
      expenseDate: row.expenseDate || '',
      createdAt: row.createdAt || ''
    }));
  }

  async addExpense(expense: Expense): Promise<void> {
    await firstValueFrom(
      this.http.post(this.baseUrl, {
        title: expense.title,   
        amount: expense.amount,
        expenseDate: expense.expenseDate
      })
    );
  }

  async deleteExpense(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.baseUrl}/${id}`)
    );
  }

  async updateExpense(id: number, expense: Expense): Promise<void> {
    const res = await firstValueFrom(
      this.http.put(`${this.baseUrl}/${id}`, {
        title: expense.title,
        amount: expense.amount,
        expenseDate: expense.expenseDate
      })
    );
  }

  async getTotalExpenses(): Promise<number> {
    const expenses = await this.getExpenses();
    return expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }
}