import { Component } from '@angular/core';
import { IonContent, IonInput,IonText, IonButton, IonCard,IonItem, IonCardContent, IonCardHeader, IonCardTitle , IonLabel} from '@ionic/angular/standalone';
import { Expense } from '../../models/expense.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from 'src/app/services/expenseServices/expense-service';
import { DashboardLinkComponent } from 'src/app/components/dashboard-link/dashboard-link.component';

@Component({ 
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.scss'],
  standalone:true,
  imports: [IonContent,IonItem,DashboardLinkComponent, IonText,IonInput,CommonModule,IonButton, IonCard, IonCardContent,IonLabel, IonCardHeader, IonCardTitle, FormsModule]
})
export class ExpensePage {

  constructor(private expService :ExpenseService ) {
  }

  async ngOnInit(){
    this.localExpenseArray = await this.expService.getExpenses();
    this.totalExpenses=await this.expService.getTotalExpenses();
  }

  isExpenseClicked =false;
  localExpenseArray : Expense[]=[];
  totalExpenses=0;
  expen : Expense ={
    amount :null as any,
    date :'',
    category: ''
  }
  
  onAddExpenseClick(){
    this.isExpenseClicked = !this.isExpenseClicked;
  }

  async onSaveClicked(){
    await this.expService.addExpense({...this.expen}); 
    this.localExpenseArray = await this.expService.getExpenses();
    this.totalExpenses = await this.expService.getTotalExpenses();
    this.resetForm();
    this.isExpenseClicked=false;
  }

  resetForm(){
    this.expen.amount=null as any;
    this.expen.category='';
    this.expen.date='';
  }
}
