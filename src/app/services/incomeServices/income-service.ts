import { Injectable } from '@angular/core';
import { Income } from 'src/app/models/income.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {

  private baseUrl = 'http://192.168.208.1:3000/income';

  constructor(private http: HttpClient){}

async getIncome():Promise<Income[]>{
const res: any = await firstValueFrom(this.http.get(this.baseUrl));
return res.data.map((row:any)=>({
  id: row.id,
  amount: row.amount,
  title: row.title,  
  incomeDate: row.incomeDate || '',
  createdAt: row.createdAt || ''
}))
}

async addIncome(income:Income): Promise<void> {
await firstValueFrom(this.http.post(this.baseUrl,{
  title:income.title,
  incomeDate: income.incomeDate,
  amount: income.amount
}))
}

async updateIncome(id: number, income: Income): Promise<void> {
  await firstValueFrom(this.http.put(`${this.baseUrl}/${id}`, {
        title: income.title,
        amount: income.amount,
        incomeDate: income.incomeDate
      }))
}

async deleteIncome(id:number): Promise<void>{
  await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
}

async getTotalIncome(): Promise<number> {

  const incomes = await this.getIncome();
  return incomes.reduce(
    (total, income) => total + Number(income.amount),
    0
  );
}

}
