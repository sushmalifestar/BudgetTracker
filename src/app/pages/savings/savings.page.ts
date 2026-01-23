import { Component } from '@angular/core';
import {  IonContent, IonLabel,IonItem,IonCard, IonIcon,IonCheckbox, IonCardContent,IonCardHeader,IonCardTitle, IonText,IonInput,IonButton} from '@ionic/angular/standalone';
import { Savings } from '../../models/savings.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SavingsService } from 'src/app/services/savingsServices/savings-service';
import { DashboardLinkComponent } from 'src/app/components/dashboard-link/dashboard-link.component';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { TransactionFormComponent } from
  'src/app/components/transaction-form/transaction-form.component';
  import { TransactionPageBase } from 'src/app/shared/transaction-page.base';

@Component({
  selector: 'app-savings',
  templateUrl: 'savings.page.html',
  styleUrls: ['savings.page.scss'],
  standalone:true,
  imports: [FormsModule, TransactionFormComponent, DashboardLinkComponent,CommonModule,IonIcon,IonCheckbox, IonContent,IonLabel, IonText,IonInput,IonButton,IonItem,IonCard,IonCardContent,IonCardHeader,IonCardTitle],
})
export class SavingsPage extends TransactionPageBase {
  constructor(private savingsService:SavingsService, private alertCtrl:AlertController) {
    super();
    addIcons({ trashOutline });
  }

  // isSavingsClicked=false;
  localSavingsArray : Savings[]=[];
  totalSavings=0;
  // newlyAddedSaving : Savings ={
  //     amount :null as any,
  //     date :'',
  //     source: '',
  //   }
    isBulkDeleteMode = false;
  selectedSavingsIds: number[] = [];
  // amountLimitExceeded=false;

  async ngOnInit(){
    this.localSavingsArray = await this.savingsService.getSavings();
    this.totalSavings= await this.savingsService.getTotalSavings();
  }

  onAddSavingsClick(){
    this.openForm();
  }

  onCancelForm() {
    this.closeForm();
  }

  async onSaveClicked(){
    if (this.model.amount === null) {
      return;
    }
    await this.savingsService.addSavings({
      amount: this.model.amount,
    date: this.model.date,
    source: this.model.source
    }); 
    this.localSavingsArray = await this.savingsService.getSavings();
    this.totalSavings = await this.savingsService.getTotalSavings();
    this.resetForm();
    this.closeForm();
  }

  // resetForm(){
  //   this.newlyAddedSaving.amount=null as any;
  //   this.newlyAddedSaving.source='';
  //   this.newlyAddedSaving.date='';
  // }

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

  enableBulkDeleteMode() {
    this.isBulkDeleteMode = true;
    this.selectedSavingsIds = [];
  }
  
  cancelBulkDeleteMode() {
    this.isBulkDeleteMode = false;
    this.selectedSavingsIds = [];
  }

  onSavingSelectionChange(id: number, event: any) {
    const checked = event.detail.checked;
  
    if (checked) {
      if (!this.selectedSavingsIds.includes(id)) {
        this.selectedSavingsIds.push(id);
      }
    } else {
      this.selectedSavingsIds = this.selectedSavingsIds.filter(
        selectedId => selectedId !== id
      );
    }
  
    console.log('Selected Savings:', this.selectedSavingsIds);
  }

  async confirmBulkDelete() {
    const count = this.selectedSavingsIds.length;
  
    const alert = await this.alertCtrl.create({
      header: 'Delete Savings',
      message: `Delete ${count} selected Saving transaction(s)?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.bulkDeleteSavings();
            return true;
          }
        }
      ]
    });
  
    await alert.present();
  }

  async bulkDeleteSavings() {
    for (const id of this.selectedSavingsIds) {
      await this.savingsService.deleteSaving(id);
    }
    this.localSavingsArray = await this.savingsService.getSavings();
    this.totalSavings = await this.savingsService.getTotalSavings();
    this.cancelBulkDeleteMode();
  }

  
  get isAllSavingsSelected(): boolean {
    return (
      this.localSavingsArray.length > 0 &&
      this.selectedSavingsIds.length === this.localSavingsArray.length
    );
  }

  onToggleSelectAllSavings(event: any) {
    const checked = event.detail.checked;

    if (checked) {
      this.selectedSavingsIds = this.localSavingsArray
        .filter(i => i.id !== undefined)
        .map(i => i.id as number);
    } else {
      this.selectedSavingsIds = [];
    }
  }

  // onAmountInput(event: any) {
  //   const value = event.target.value;
  
  //   if (!value){
  //     this.amountLimitExceeded = false;
  //     return;
  //   } 
  //   const digitsOnly = value.toString().replace(/\D/g, '');
  
  //   if (digitsOnly.length > 10) {
  //     event.target.value = digitsOnly.slice(0, 10);
  //     this.amountLimitExceeded = true;
  //   } else {
  //     this.amountLimitExceeded = false;
  //   }
  // }

}
