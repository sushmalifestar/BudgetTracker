import { Injectable } from '@angular/core';
import { Savings } from 'src/app/models/savings.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root',
})
export class SavingsService {

  private baseUrl = 'http://localhost:3000/savings'

  constructor(private http:HttpClient){
  }

  async getAllSavings():Promise<Savings[]>{
    const res: any = await firstValueFrom(this.http.get(this.baseUrl));
    return res.data.map((row:any)=>({
      id: row.id,
      amount: row.amount,
      title: row.title,   
      savingsDate: row.savingsDate || '',
      createdAt: row.createdAt || ''
    }))
  }

  async addSavings(saving:Savings): Promise<void> {
  await firstValueFrom(this.http.post(this.baseUrl,{
    title:saving.title,
    savingsDate: saving.savingsDate,
    amount: saving.amount
  }))
  }

  async updateSavings(id: number, saving: Savings): Promise<void> {
    await firstValueFrom(this.http.put(`${this.baseUrl}/${id}`, {
          title: saving.title,
          amount: saving.amount,
          savingsDate: saving.savingsDate
        }))
  }

  async deleteSavings(id:number): Promise<void>{
    await firstValueFrom(this.http.delete(`${this.baseUrl}/${id}`))
  }
  

  async getTotalSavings(): Promise<number> {
    const savings = await this.getAllSavings();
    return savings.reduce(
      (total, saving) => total + saving.amount,
      0
    );
  }

 
}
