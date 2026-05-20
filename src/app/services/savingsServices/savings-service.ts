import { Injectable } from '@angular/core';
import { Savings } from 'src/app/models/savings.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SavingsService {

  private baseUrl = 'http://localhost:3000/savings'

  constructor(private http:HttpClient){
  }

  async getSavings():Promise<Savings[]>{
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

  async addSavings(saving:Savings): Promise<void> {
  await firstValueFrom(this.http.post(this.baseUrl,{
    source:saving.source,
    date: saving.date,
    amount: saving.amount
  }))
  }

  async updateSaving(id: number, saving: Savings): Promise<void> {
    await firstValueFrom(this.http.put(`${this.baseUrl}/${id}`, {
          source: saving.source,
          amount: saving.amount,
          note: saving.note,
          date: saving.date
        }))
  }

  async deleteSaving(id:number): Promise<void>{
    console.log("inside delete in frontend service")
    await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
  }
  

  async getTotalSavings(): Promise<number> {
    const savings = await this.getSavings();
    return savings.reduce(
      (total, saving) => total + saving.amount,
      0
    );
  }

 
}
