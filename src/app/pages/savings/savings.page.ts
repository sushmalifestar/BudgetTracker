import { Component } from '@angular/core';
import { IonContent, IonLabel, IonItem, IonCard, IonIcon, IonCheckbox, IonCardContent, IonCardHeader, IonCardTitle, IonText, IonInput, IonButton } from '@ionic/angular/standalone';
import { Savings } from '../../models/savings.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SavingsService } from 'src/app/services/savingsServices/savings-service';
import { DashboardLinkComponent } from 'src/app/components/dashboard-link/dashboard-link.component';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons';
import { TransactionFormComponent } from
  'src/app/components/transaction-form/transaction-form.component';
import { TransactionPageBase } from 'src/app/shared/transaction-page.base';

@Component({
  selector: 'app-savings',
  templateUrl: 'savings.page.html',
  styleUrls: ['savings.page.scss'],
  standalone: true,
  imports: [FormsModule, TransactionFormComponent, DashboardLinkComponent, CommonModule, IonIcon, IonCheckbox, IonContent, IonLabel, IonText, IonInput, IonButton, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardTitle],
})
export class SavingsPage extends TransactionPageBase {
  
  localSavingsArray: Savings[] = [];
  totalSavings = 0;
  isBulkDeleteMode = false;
  selectedSavingsIds: number[] = [];
  selectedSaving: Savings | null = null;
  isEditMode = false;

  constructor(private savingsService: SavingsService, private alertCtrl: AlertController) {
    super();
    addIcons({ trashOutline ,createOutline });
  }

  async ngOnInit() {
  }

  async loadSavingData() {
    this.localSavingsArray = await this.savingsService.getAllSavings();
    this.totalSavings = await this.savingsService.getTotalSavings();
  }

  onAddSavingsClick() {
    this.openForm();
    this.isEditMode = false;
  }

  ionViewWillEnter() {
    this.loadSavingData();
  }

  onCancelForm() {
    this.closeForm();
    this.resetForm();
  }

  async onSaveClicked(formData: any) {
    if (formData === null) {
      return;
    }
    if (this.isEditMode && this.selectedSaving) {

      await this.savingsService.updateSavings(
        this.selectedSaving.id!,
        {
          amount: formData.amount,
          savingsDate: formData.date,
          title: formData.title
        }
      );
      await this.loadSavingData();
  
    } else {
    await this.savingsService.addSavings({
      amount: formData.amount,
      savingsDate: formData.date,
      title: formData.title
    });
  }
    this.localSavingsArray = await this.savingsService.getAllSavings();
    this.totalSavings = await this.savingsService.getTotalSavings();
    this.resetForm();
    this.closeForm();
  }

  async onDeleteClick(saving: any) {

    const alert = await this.alertCtrl.create({
      header: 'Delete Saving',
      message: 'Are you sure you want to delete this Saving?',
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
            await this.deleteSavings(saving.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteSavings(id: number) {
    await this.savingsService.deleteSavings(id);
    this.localSavingsArray = await this.savingsService.getAllSavings();
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
      await this.savingsService.deleteSavings(id);
    }
    this.localSavingsArray = await this.savingsService.getAllSavings();
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

  onEditClick(saving: Savings) {
        this.selectedSaving = saving;
        this.isEditMode = true;
        this.model.amount = saving.amount;
        this.model.date = saving.savingsDate.split('T')[0];
        this.model.title = saving.title;
        this.openForm();
      }

}
