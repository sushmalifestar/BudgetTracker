import { Injectable } from '@angular/core';
import { Income } from '../models/income.model';
import { DataService } from './data-service';
@Injectable({
  providedIn: 'root',
})
export class IncomeService {

  constructor(private dataService:DataService){}
  
private incomeArray:Income[]=[]

getIncome():Promise<Income[]>{
return this.dataService.getIncomes();
}

addIncome(income:Income): Promise<void> {
return this.dataService.addIncome(income);
}

async getTotalIncome(): Promise<number> {
  const incomes = await this.getIncome();
  return incomes.reduce(
    (total, income) => total + income.amount,
    0
  );
}
}
