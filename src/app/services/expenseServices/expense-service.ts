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
      source: row.title,   
      note: row.note || '',
      date: row.date || '',
      createdAt: row.createdAt || ''
    }));
  }

  async addExpense(expense: Expense): Promise<void> {
    console.log("inside expense service", expense)
    await firstValueFrom(
      this.http.post(this.baseUrl, {
        title: expense.source,   
        amount: expense.amount,
        note: expense.note,
        date: expense.date
      })
    );
  }

  async deleteExpense(id: number): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.baseUrl}/${id}`)
    );
  }

  async updateExpense(id: number, expense: Expense): Promise<void> {
    console.log('UPDATE ID:', id);
    console.log('UPDATE DATA:', expense);
    const res = await firstValueFrom(
      this.http.put(`${this.baseUrl}/${id}`, {
        title: expense.source,
        amount: expense.amount,
        note: expense.note,
        date: expense.date
      })
    );
    console.log('UPDATE RESPONSE:', res); 
  }

  async getTotalExpenses(): Promise<number> {
    const expenses = await this.getExpenses();
    return expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }
}