import { Component } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
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
  IonCardContent
} from '@ionic/angular/standalone';
import { IncomeService } from '../services/income-service';
import { ExpenseService } from '../services/expense-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList,
    IonItem,
    CommonModule,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ],
})
export class Tab1Page {

  totalIncome = 0;
  totalExpenses = 0;
  balance = 0;

  constructor( private inService : IncomeService, private exService: ExpenseService) {
   }

   ionViewWillEnter() {
    this.calculate();
  }

  calculate() {
    this.totalIncome = this.inService.getTotalIncome();
    this.totalExpenses=this.exService.getTotalExpenses();
    this.balance=this.totalIncome-this.totalExpenses;
  }

}
