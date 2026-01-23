export interface TransactionDraft {
    amount: number | null;
    date: string;
    source: string;
  }

  export function createEmptyTransaction(): TransactionDraft {
    return {
      amount: null,
      date: '',
      source: ''
    };
  }