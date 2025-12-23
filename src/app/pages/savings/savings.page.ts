import { Component } from '@angular/core';
import {  IonContent, IonLabel,IonItem,IonCard,IonCardContent,IonCardHeader,IonList,IonCardTitle, IonText,IonInput,IonButton} from '@ionic/angular/standalone';
import { Savings } from '../../models/savings.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SavingsService } from 'src/app/services/savingsServices/savings-service';
import { DashboardLinkComponent } from 'src/app/components/dashboard-link/dashboard-link.component';

@Component({
  selector: 'app-savings',
  templateUrl: 'savings.page.html',
  styleUrls: ['savings.page.scss'],
  standalone:true,
  imports: [FormsModule,DashboardLinkComponent,CommonModule, IonContent,IonLabel, IonText,IonInput,IonButton,IonItem,IonCard,IonList,IonCardContent,IonCardHeader,IonCardTitle],
})
export class SavingsPage {
  constructor(private savingsService:SavingsService) {}

  isSavingsClicked=false;
  localSavingsArray : Savings[]=[];
  totalSavings=0;
  saving : Savings ={
      amount :null as any,
      date :'',
      type: '',
    }

  async ngOnInit(){
    this.localSavingsArray = await this.savingsService.getSavings();
    this.totalSavings= await this.savingsService.getTotalSavings();
  }

  onAddSavingsClick(){
    this.isSavingsClicked = !this.isSavingsClicked;
  }

  async onSaveClicked(){
    await this.savingsService.addSavings({...this.saving}); 
    this.localSavingsArray = await this.savingsService.getSavings();
    this.totalSavings = await this.savingsService.getTotalSavings();
    this.resetForm();
    this.isSavingsClicked=false;
  }

  resetForm(){
    this.saving.amount=null as any;
    this.saving.type='';
    this.saving.date='';
  }
}
