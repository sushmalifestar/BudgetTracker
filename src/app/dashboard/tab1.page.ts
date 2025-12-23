import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonCol,
  IonRow,
  IonCardContent
} from '@ionic/angular/standalone';
import { IncomeService } from '../services/income-service';
import { ExpenseService } from '../services/expense-service';
import { DataService } from '../services/data-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonItem,
    CommonModule,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
  IonCol,
  IonRow,
    IonCardContent
  ],
})
export class Tab1Page {

  totalIncome = 0;
  totalExpenses = 0;
  totalSavings=0;
  balance = 0;

  constructor( private inService : IncomeService, private exService: ExpenseService, private router:Router, private dataService: DataService) {
   }

   ionViewWillEnter() {
    this.calculate();
  }

  async calculate() {
    this.totalIncome = await this.inService.getTotalIncome();
    this.totalExpenses= await this.exService.getTotalExpenses();
    this.balance=this.totalIncome-this.totalExpenses;
  }

  goToIncome() {
    this.router.navigate(['/tabs/income']);
  }

  goToExpense() {
    this.router.navigate(['/tabs/expenses']);
  }
  goToSavings(){
    this.router.navigate(['/tabs/savings'])
  }

}
