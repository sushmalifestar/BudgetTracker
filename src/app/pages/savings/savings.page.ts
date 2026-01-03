import { Component } from '@angular/core';
import {  IonContent, IonLabel,IonItem,IonCard, IonIcon, IonCardContent,IonCardHeader,IonCardTitle, IonText,IonInput,IonButton} from '@ionic/angular/standalone';
import { Savings } from '../../models/savings.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SavingsService } from 'src/app/services/savingsServices/savings-service';
import { DashboardLinkComponent } from 'src/app/components/dashboard-link/dashboard-link.component';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-savings',
  templateUrl: 'savings.page.html',
  styleUrls: ['savings.page.scss'],
  standalone:true,
  imports: [FormsModule,DashboardLinkComponent,CommonModule,IonIcon, IonContent,IonLabel, IonText,IonInput,IonButton,IonItem,IonCard,IonCardContent,IonCardHeader,IonCardTitle],
})
export class SavingsPage {
  constructor(private savingsService:SavingsService, private alertCtrl:AlertController) {
    addIcons({ trashOutline });
  }

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

  async onDeleteClick(saving: any) {

    console.log('CONFIRM DELETE CLICKED', saving.id);
    const alert = await this.alertCtrl.create({
      header: 'Delete Expense',
      message: 'Are you sure you want to delete this expense?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            console.log('DELETE CONFIRMED', saving.id);
            await this.deleteSaving(saving.id);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async deleteSaving(id: number) {
    await this.savingsService.deleteSaving(id);
    this.localSavingsArray = await this.savingsService.getSavings();
    this.totalSavings = await this.savingsService.getTotalSavings();
  }

}
