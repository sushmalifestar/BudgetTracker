import { Injectable } from '@angular/core';
import { Income } from '../models/income.model';
@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  
private incomeArray:Income[]=[]

getIncome():Income[]{
return this.incomeArray;
}

addIncome(income:Income){
this.incomeArray.push(income);
}

getTotalIncome():number{
  return this.incomeArray.reduce((total,income)=>income.amount+ total ,0)
    
}

}
