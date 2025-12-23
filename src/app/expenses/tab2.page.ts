import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput,IonText, IonButton,IonList, IonCard,IonItem, IonCardContent, IonCardHeader, IonCardTitle , IonLabel} from '@ionic/angular/standalone';
import { Expense } from '../models/expense.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense-service';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonItem,IonList, IonText,IonInput,CommonModule,IonButton, IonCard, IonCardContent,IonLabel, IonCardHeader, IonCardTitle, FormsModule]
})
export class Tab2Page {

  constructor(private expService :ExpenseService, private router:Router ) {
  }

  async ngOnInit(){
    this.localExpenseArray = await this.expService.getExpenses();
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
    console.log("Add Expense button clicked");
    if(this.isExpenseClicked)
      this.isExpenseClicked= false;
    else
    this.isExpenseClicked = true;
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

  goToDashboard(){
    this.router.navigate(['tabs/dashboard'])
  }
}
