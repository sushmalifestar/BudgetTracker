import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput,IonText, IonButton,IonList, IonCard,IonItem, IonCardContent, IonCardHeader, IonCardTitle , IonLabel} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Expense } from '../models/expense.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense-service';


@Component({ 
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonItem,IonList, IonText,IonInput,CommonModule, ExploreContainerComponent,IonButton, IonCard, IonCardContent,IonLabel, IonCardHeader, IonCardTitle, FormsModule]
})
export class Tab2Page {

  constructor(private expService :ExpenseService ) {
    this.localExpenseArray = this.expService.getExpenses();
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

  onSaveClicked(){
    this.expService.addExpense({...this.expen});
    this.resetForm();
    this.isExpenseClicked=false;
    this.totalExpenses =this.expService.getTotalExpenses();
  }

  resetForm(){
    this.expen.amount=null as any;
    this.expen.category='';
    this.expen.date='';
  }
}
