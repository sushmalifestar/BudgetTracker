export interface Expense{
    id?: number;
    amount: number;
    source: string;
    note?: string;
    date: string;
    createdAt?: string;
}