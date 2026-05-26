export interface StatementItem {

    type: 'income' | 'expense' | 'saving';
    title: string;
    amount: number;
    date: string;
  
  }