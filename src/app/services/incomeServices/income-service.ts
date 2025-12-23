import { Injectable } from '@angular/core';
import { DataService } from '../dataServices/data-service';
import { Income } from 'src/app/models/income.model';

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
