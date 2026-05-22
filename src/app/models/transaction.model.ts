export interface TransactionDraft {
    amount: number | null;
    date: string;
    title: string;
  }

  export function createEmptyTransaction(): TransactionDraft {
    return {
      amount: null,
      date: '',
      title: ''
    };
  }