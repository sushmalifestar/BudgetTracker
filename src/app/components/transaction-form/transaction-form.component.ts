import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule, FormBuilder,FormArray,FormGroup, FormControl, Validators} from '@angular/forms';
import { TransactionDraft } from 'src/app/models/transaction.model';
import { AbstractControl, ValidationErrors } from '@angular/forms';
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
    ReactiveFormsModule,
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
  @Input() submitLabel = 'Save';
  @Input() showCancel = true;
  @Output() save = new EventEmitter<typeof this.model>();
  @Output() cancel = new EventEmitter<void>();

  amountLimitExceeded = false;
  largeTransaction =false;

  constructor(private fb:FormBuilder){}

  transactionForm= this.fb.group({
    amount:[null as number | null ,[Validators.required, positiveAmountValidator]],
    source: ['', Validators.required],
    date:['', [Validators.required, noFutureDateValidator]]
  })

  get fDetails(){
    return this.transactionForm.controls;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model'] && this.model) {
      this.transactionForm.patchValue(this.model);
    }
  }

  ngOnInit(){
    this.transactionForm.get('amount')?.valueChanges.subscribe(amount=>{
    if (amount === null) return;
    this.largeTransaction = amount > 100000;
    })
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
    if (this.transactionForm.invalid) {
      return;
    }
    const data = this.transactionForm.value as TransactionDraft;
  this.save.emit(data);
  }
  
  onCancel() {
    this.cancel.emit();
  }

}

export function positiveAmountValidator(control: AbstractControl): ValidationErrors | null {

  const value = control.value;

  if (value === null) return null;

  if (value <= 0) {
    return { invalidAmount: true };
  }

  return null;
}

export function noFutureDateValidator(control: AbstractControl): ValidationErrors | null {

  const value = control.value;

  if (!value) return null;

  const selectedDate = new Date(value);
  const today = new Date();

  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0,0,0,0);

  if (selectedDate > today) {
    return { futureDate: true };
  }

  return null;
}