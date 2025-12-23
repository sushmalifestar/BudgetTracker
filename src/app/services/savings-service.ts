import { Injectable } from '@angular/core';
import { DataService } from './data-service';
import { Savings } from '../models/savings.model';

@Injectable({
  providedIn: 'root',
})
export class SavingsService {

  constructor(private dataService:DataService){
  }

  getSavings():Promise<Savings[]>{
    return this.dataService.getSavings();
  }

  addSavings(saving: Savings): Promise<void>{
    return this.dataService.addSavings(saving);
  }

  async getTotalSavings(): Promise<number> {
    const savings = await this.getSavings();
    return savings.reduce(
      (total, saving) => total + saving.amount,
      0
    );
  }
  
}
