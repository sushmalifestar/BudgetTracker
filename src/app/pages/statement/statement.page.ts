import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IncomeService } from 'src/app/services/incomeServices/income-service';
import { ExpenseService } from 'src/app/services/expenseServices/expense-service';
import { SavingsService } from 'src/app/services/savingsServices/savings-service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.page.html',
  styleUrls: ['./statement.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StatementPage implements OnInit {

  constructor(private incomeService:IncomeService, private expenseService:ExpenseService, private savingService: SavingsService) { }

  ngOnInit() {
  }

}
