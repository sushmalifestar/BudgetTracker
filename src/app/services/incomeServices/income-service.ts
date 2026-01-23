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

deleteIncome(id:number): Promise<void>{
  return this.dataService.deleteIncome(id)
}

// async getTotalIncome(): Promise<number> {
//   const incomes = await this.getIncome();
//   return incomes.reduce(
//     (total, income) => total + Number(income.amount) ,
//     0
//   );
// }

async getTotalIncome(): Promise<number> {

  console.log("Hi Sushma");
  const incomes = await this.getIncome();

  incomes.forEach(i => {
    console.log(
      'AMOUNT:', i.amount,
      'TYPE:', typeof i.amount,
      'NUMBER:', Number(i.amount)
    );
  });

  return incomes.reduce(
    (total, income) => total + Number(income.amount),
    0
  );
}


}
