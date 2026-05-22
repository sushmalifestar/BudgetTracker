import { TransactionDraft, createEmptyTransaction } from '../models/transaction.model';

export abstract class TransactionPageBase {

  isFormOpen = false;

  model: TransactionDraft = createEmptyTransaction();

  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
  }

  resetForm() {
    this.model = createEmptyTransaction();
  }

}
