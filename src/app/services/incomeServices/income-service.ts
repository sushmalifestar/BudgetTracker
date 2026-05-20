import { Injectable } from '@angular/core';
import { Income } from 'src/app/models/income.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {

  private baseUrl = 'http://localhost:3000/income';

  constructor(private http: HttpClient){}

async getIncome():Promise<Income[]>{
const res: any = await firstValueFrom(this.http.get(this.baseUrl));
return res.data.map((row:any)=>({
  id: row.id,
  amount: row.amount,
  source: row.source,   
  note: row.note || '',
  date: row.date || '',
  createdAt: row.createdAt || ''
}))
}

async addIncome(income:Income): Promise<void> {
await firstValueFrom(this.http.post(this.baseUrl,{
  source:income.source,
  date: income.date,
  amount: income.amount
}))
}

async updateIncome(id: number, income: Income): Promise<void> {
  await firstValueFrom(this.http.put(`${this.baseUrl}/${id}`, {
        source: income.source,
        amount: income.amount,
        note: income.note,
        date: income.date
      }))
}

async deleteIncome(id:number): Promise<void>{
  console.log("inside delete in frontend service")
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
