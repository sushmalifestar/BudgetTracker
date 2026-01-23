import { Component } from '@angular/core';
import { IonContent, IonInput,IonText, IonButton, IonIcon,IonCheckbox, IonCard,IonItem, IonCardContent, IonCardHeader, IonCardTitle , IonLabel} from '@ionic/angular/standalone';
import { Expense } from '../../models/expense.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from 'src/app/services/expenseServices/expense-service';
import { DashboardLinkComponent } from 'src/app/components/dashboard-link/dashboard-link.component';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { TransactionFormComponent } from
  'src/app/components/transaction-form/transaction-form.component';
  import { TransactionPageBase } from 'src/app/shared/transaction-page.base';

@Component({ 
  selector: 'app-expenses',
  templateUrl: 'expenses.page.html',
  styleUrls: ['expenses.page.scss'],
  standalone:true,
  imports: [IonContent, TransactionFormComponent, IonItem,DashboardLinkComponent,IonIcon,IonCheckbox, IonText,IonInput,CommonModule,IonButton, IonCard, IonCardContent,IonLabel, IonCardHeader, IonCardTitle, FormsModule]
})
export class ExpensePage extends TransactionPageBase {

  constructor(private expService :ExpenseService, private alertCtrl:AlertController ) {
    super();
    addIcons({ trashOutline });
  }

  async ngOnInit(){
    this.localExpenseArray = await this.expService.getExpenses();
    this.totalExpenses=await this.expService.getTotalExpenses();
  }

  localExpenseArray : Expense[]=[];
  totalExpenses=0;
  isBulkDeleteMode = false;
  selectedExpenseIds: number[] = [];
  
  onAddExpenseClick(){
    this.openForm();
  }

  onCancelForm() {
    this.closeForm();
  }

  async onSaveClicked(){
    if (this.model.amount === null) {
      return;
    }
    await this.expService.addExpense({
      amount: this.model.amount,
    date: this.model.date,
    source: this.model.source
    }); 
    this.localExpenseArray = await this.expService.getExpenses();
    this.totalExpenses = await this.expService.getTotalExpenses();
    this.resetForm();
    this.closeForm();
  }

  async onDeleteClick(expense: any) {

    console.log('CONFIRM DELETE CLICKED', expense.id);
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
            console.log('DELETE CONFIRMED', expense.id);
            await this.deleteExpense(expense.id);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async deleteExpense(id: number) {
    await this.expService.deleteExpense(id);
    this.localExpenseArray = await this.expService.getExpenses();
    this.totalExpenses = await this.expService.getTotalExpenses();
  }

  enableBulkDeleteMode() {
    this.isBulkDeleteMode = true;
    this.selectedExpenseIds = [];
  }
  
  cancelBulkDeleteMode() {
    this.isBulkDeleteMode = false;
    this.selectedExpenseIds = [];
  }

  onExpensesSelectionChange(id: number, event: any) {
    const checked = event.detail.checked;
  
    if (checked) {
      if (!this.selectedExpenseIds.includes(id)) {
        this.selectedExpenseIds.push(id);
      }
    } else {
      this.selectedExpenseIds = this.selectedExpenseIds.filter(
        selectedId => selectedId !== id
      );
    }
  
    console.log('Selected Expenses:', this.selectedExpenseIds);
  }

  async confirmBulkDelete() {
    const count = this.selectedExpenseIds.length;
  
    const alert = await this.alertCtrl.create({
      header: 'Delete Expenses',
      message: `Delete ${count} selected expense transaction(s)?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.bulkDeleteExpenses();
            return true;
          }
        }
      ]
    });
  
    await alert.present();
  }

  async bulkDeleteExpenses() {
    for (const id of this.selectedExpenseIds) {
      await this.expService.deleteExpense(id);
    }
    this.localExpenseArray = await this.expService.getExpenses();
    this.totalExpenses = await this.expService.getTotalExpenses();
    this.cancelBulkDeleteMode();
  }

  get isAllExpensesSelected(): boolean {
    return (
      this.localExpenseArray.length > 0 &&
      this.selectedExpenseIds.length === this.localExpenseArray.length
    );
  }

  onToggleSelectAllExpenses(event: any) {
    const checked = event.detail.checked;

    if (checked) {
      this.selectedExpenseIds = this.localExpenseArray
        .filter(i => i.id !== undefined)
        .map(i => i.id as number);
    } else {
      this.selectedExpenseIds = [];
    }
  }

}
