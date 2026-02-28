import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonCard, IonIcon, IonCheckbox, IonCardTitle, IonCardHeader, IonItemSliding, IonItemOption, IonItemOptions, IonCardContent, IonText, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Income } from 'src/app/models/income.model';
import { IncomeService } from 'src/app/services/incomeServices/income-service';
import { DashboardLinkComponent } from 'src/app/components/dashboard-link/dashboard-link.component';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons';
import { TransactionFormComponent } from
  'src/app/components/transaction-form/transaction-form.component';
import { TransactionPageBase } from 'src/app/shared/transaction-page.base';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
  standalone: true,
  imports: [IonContent, TransactionFormComponent, IonText, DashboardLinkComponent, IonCheckbox, IonIcon, IonCardTitle, IonCardHeader, IonItemSliding, IonItemOption, IonItemOptions, IonCardContent, IonCard, IonLabel, CommonModule, FormsModule, IonButton, IonItem, IonInput]
})
export class IncomePage extends TransactionPageBase implements OnInit {

  localIncomeArray: Income[] = [];
  totalIncome = 0;
  isBulkDeleteMode = false;
  selectedIncomeIds: number[] = [];
  selectedIncome: Income | null = null;
  isEditMode = false;

  constructor(private inservice: IncomeService, private alertCtrl: AlertController) {
    super();
    addIcons({ trashOutline, createOutline });
  }

  async ngOnInit() {
  }

  async loadIncomeData() {
    this.localIncomeArray = await this.inservice.getIncome();
    this.totalIncome = await this.inservice.getTotalIncome();
  }

  onAddIncomeClick() {
    this.openForm();
  }

  ionViewWillEnter() {
    this.loadIncomeData();
  }

  onCancelForm() {
    this.closeForm();
  }

  async onSaveClicked(formData: any) {
    if (formData === null) {
      return;
    }
    if (this.isEditMode && this.selectedIncome) {

      await this.inservice.updateIncome(
        this.selectedIncome.id!,
        formData
      );
  
    } else {
    await this.inservice.addIncome({
      amount: formData.amount,
      date: formData.date,
      source: formData.source
    });
  }

    this.localIncomeArray = await this.inservice.getIncome();
    this.totalIncome = await this.inservice.getTotalIncome();

    this.isEditMode = false;
  this.selectedIncome = null;

    this.resetForm();
    this.closeForm();
  }

  async onDeleteClick(income: any) {

    console.log('CONFIRM DELETE CLICKED', income.id);
    const alert = await this.alertCtrl.create({
      header: 'Delete Income',
      message: 'Are you sure you want to delete this income?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            console.log('DELETE CONFIRMED', income.id);
            await this.deleteIncome(income.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteIncome(id: number) {
    await this.inservice.deleteIncome(id);
    this.localIncomeArray = await this.inservice.getIncome();
    this.totalIncome = await this.inservice.getTotalIncome();
  }

  enableBulkDeleteMode() {
    this.isBulkDeleteMode = true;
    this.selectedIncomeIds = [];
  }

  cancelBulkDeleteMode() {
    this.isBulkDeleteMode = false;
    this.selectedIncomeIds = [];
  }

  onIncomeSelectionChange(id: number, event: any) {
    const checked = event.detail.checked;

    if (checked) {
      if (!this.selectedIncomeIds.includes(id)) {
        this.selectedIncomeIds.push(id);
      }
    } else {
      this.selectedIncomeIds = this.selectedIncomeIds.filter(
        selectedId => selectedId !== id
      );
    }

    console.log('Selected incomes:', this.selectedIncomeIds);
  }

  async confirmBulkDelete() {
    const count = this.selectedIncomeIds.length;

    const alert = await this.alertCtrl.create({
      header: 'Delete Incomes',
      message: `Delete ${count} selected income transaction(s)?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.bulkDeleteIncomes();
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async bulkDeleteIncomes() {
    for (const id of this.selectedIncomeIds) {
      await this.inservice.deleteIncome(id);
    }
    this.localIncomeArray = await this.inservice.getIncome();
    this.totalIncome = await this.inservice.getTotalIncome();
    this.cancelBulkDeleteMode();
  }

  get isAllIncomeSelected(): boolean {
    return (
      this.localIncomeArray.length > 0 &&
      this.selectedIncomeIds.length === this.localIncomeArray.length
    );
  }

  onToggleSelectAllIncome(event: any) {
    const checked = event.detail.checked;

    if (checked) {
      this.selectedIncomeIds = this.localIncomeArray
        .filter(i => i.id !== undefined)
        .map(i => i.id as number);
    } else {
      this.selectedIncomeIds = [];
    }
  }


  onEditClick(income: Income) {
    console.log("Edit button is clicked");
    this.selectedIncome = income;
    this.isEditMode = true;

    this.model.amount = income.amount;
    this.model.date = income.date;
    this.model.source = income.source;

    this.openForm();
  }

}

