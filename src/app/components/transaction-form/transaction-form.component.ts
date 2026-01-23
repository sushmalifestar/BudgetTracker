import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonInput,
    IonItem,
    IonLabel,
    IonButton,
    IonText
  ],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
  
  @Input() model!: {
    amount: number | null;
    date: string;
    source: string;
  };
  
  @Input() submitLabel = 'Save';
  @Input() showCancel = true;
  
  @Output() save = new EventEmitter<typeof this.model>();
  @Output() cancel = new EventEmitter<void>();

  amountLimitExceeded = false;


  onAmountInput(event: any) {
    const value = event.target.value;
    if (!value) {
      this.amountLimitExceeded = false;
      return;
    }
  
    const digitsOnly = value.toString().replace(/\D/g, '');
  
    if (digitsOnly.length > 10) {
      event.target.value = digitsOnly.slice(0, 10);
      this.amountLimitExceeded = true;
    } else {
      this.amountLimitExceeded = false;
    }
  }

  onSubmit() {
    if (!this.model.amount || this.model.amount <= 0) {
      return;
    }
    this.save.emit(this.model);
  }
  
  onCancel() {
    this.cancel.emit();
  }
  
  
  

}
