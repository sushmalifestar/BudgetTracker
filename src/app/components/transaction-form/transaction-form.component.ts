import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionDraft } from 'src/app/models/transaction.model';
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
export class TransactionFormComponent implements OnChanges  {
  
  @Input() model!: TransactionDraft;
  
  localModel!:TransactionDraft;

  @Input() submitLabel = 'Save';
  @Input() showCancel = true;
  
  @Output() save = new EventEmitter<typeof this.model>();
  @Output() cancel = new EventEmitter<void>();

  amountLimitExceeded = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && this.model) {
      this.localModel = { ...this.model }; 
    }
  }

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
    if (!this.localModel.amount || this.localModel.amount <= 0) {
      return;
    }
    this.save.emit(this.localModel);
  }
  
  onCancel() {
    this.cancel.emit();
  }

}
