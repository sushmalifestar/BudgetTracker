import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton , IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonModal, IonDatetimeButton, IonText, IonList, IonInput, IonItem, IonLabel} from '@ionic/angular/standalone';
import { Income } from 'src/app/models/income.model';
import { Router } from '@angular/router';
import { IncomeService } from 'src/app/services/incomeServices/income-service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle,IonText, IonModal, IonCardHeader, IonCardTitle, IonCardContent,IonCard, IonToolbar,IonDatetimeButton, IonLabel, CommonModule, FormsModule,IonButton,IonList, IonItem, IonInput]
})
export class IncomePage implements OnInit {

  localIncomeArray: Income[]=[];
  totalIncome = 0;
  isIncomeClicked = false;
  newlyAddedIncome : Income ={
    amount : null as any,
    date : '',
    source:''
  }

  constructor( private inservice:IncomeService, private router:Router) {
    
   }

  async ngOnInit() {
    this.localIncomeArray= await this.inservice.getIncome();
    this.totalIncome= await this.inservice.getTotalIncome();
  }

  onAddIncomeClick(){
    this.isIncomeClicked = !this.isIncomeClicked;
  }

  async onSaveClicked(){
    console.log("Save button clicked");
    await this.inservice.addIncome({...this.newlyAddedIncome});
    this.totalIncome = await this.inservice.getTotalIncome();
    this.localIncomeArray= await this.inservice.getIncome();
    this.isIncomeClicked = false;
    this.formReset();
  }

  formReset(){
    this.newlyAddedIncome.amount=null as any;
    this.newlyAddedIncome.date='';
    this.newlyAddedIncome.source='';
  }

  goToDashboard(){
    this.router.navigate(['tabs/dashboard'])
  }

}

