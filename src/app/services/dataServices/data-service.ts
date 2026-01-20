import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';
import { Expense } from '../../models/expense.model';
import { Income } from '../../models/income.model';
import { Savings } from '../../models/savings.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private readonly dbName = 'expense_tracker.db';

  private webExpenses: Expense[] = [];
  private webIncomes: Income[] = [];
  private webSavings : Savings[]=[];
  private dbReady = false;
  private dbInitializing = false;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initDatabase() {
    if (Capacitor.getPlatform() === 'web') {
      console.warn('SQLite not supported on web');
      return;
    }

    if (this.dbReady || this.dbInitializing) {
      return;
    }

    this.dbInitializing = true;

    this.db = await this.sqlite.createConnection(
      this.dbName,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();
    this.dbReady = true;
    this.dbInitializing = false;
    console.log('Database opened successfully');
  }

  async createTables() {
    if (Capacitor.getPlatform() === 'web') {
      console.log('Web platform: skipping SQLite table creation');
      return;
    }

    const createExpenseTable = `
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        note TEXT,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `;

    const createIncomeTable = `
      CREATE TABLE IF NOT EXISTS incomes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        source TEXT NOT NULL,
        note TEXT,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL
      );
    `;

    const createSavingsTable =` CREATE TABLE IF NOT EXISTS savings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    type TEXT NOT NULL,
    note TEXT,
    date TEXT NOT NULL
  );`

    await this.db.execute(createExpenseTable);
    await this.db.execute(createIncomeTable);
    await this.db.execute(createSavingsTable);

    console.log('SQLite tables created');
  }
  
  async addExpense(expense: Expense) {

    if (Capacitor.getPlatform() === 'web') {
      const newExpense: Expense = {
        ...expense,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      this.webExpenses.push(newExpense);
      console.log('Expense added (web):', this.webExpenses);
      return;
    }
    if (!this.dbReady) {
      await this.initDatabase();
      await this.createTables();
    }
    const query = `
      INSERT INTO expenses (amount, category, note, date, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      expense.amount,
      expense.category,
      expense.note || '',
      expense.date,
      new Date().toISOString()
    ];
    await this.db.run(query, values);
    console.log('Expense added (SQLite)');
  }

  async getExpenses(): Promise<Expense[]> {

    if (Capacitor.getPlatform() === 'web') {
      console.log('Fetching expenses (web):', this.webExpenses);
      return this.webExpenses;
    }

    const query = `
      SELECT id, amount, category, note, date, createdAt
      FROM expenses
      ORDER BY date DESC
    `;

    const result = await this.db.query(query);
    const rows = (result.values || []) as Expense[];

    console.log('Fetching expenses (SQLite):', rows);
    return rows;
  }

  async deleteIncome (id:number){

    if (Capacitor.getPlatform() === 'web'){
      this.webIncomes = this.webIncomes.filter(income => income.id !== id);
      return;
    }

    if (!this.dbReady) {
      await this.initDatabase();
      await this.createTables();
    }

    const query = `DELETE FROM incomes WHERE id = ?`;
    await this.db.run(query ,[id]);

  }

  async deleteExpense (id:number){

    if(Capacitor.getPlatform() === 'web'){
      this.webExpenses=this.webExpenses.filter(expense => expense.id !== id);
      return;
    }

    if (!this.dbReady) {
      await this.initDatabase();
      await this.createTables();
    }

    const query = `DELETE FROM expenses WHERE id = ?`;
    await this.db.run(query ,[id]);

  }

  async deleteSaving (id:number){

    if(Capacitor.getPlatform() === 'web'){
      this.webSavings = this.webSavings.filter(saving => saving.id !== id);
      return;
    }

    if (!this.dbReady) {
      await this.initDatabase();
      await this.createTables();
    }

    const query = `DELETE FROM savings WHERE id = ?`;
    await this.db.run(query ,[id]);

  }

  async addIncome(income: Income) {

    if (Capacitor.getPlatform() === 'web') {
      const newIncome: Income = {
        ...income,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      this.webIncomes.push(newIncome);
      console.log('Income added (web):', this.webIncomes);
      return;
    }

    console.log('STEP 3: android path BEFORE db.run');

    if (!this.dbReady) {
      await this.initDatabase();
      await this.createTables();
    }

    const query = `
      INSERT INTO incomes (amount, source, note, date, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      income.amount,
      income.source,
      income.note || '',
      income.date,
      new Date().toISOString()
    ];

    await this.db.run(query, values);
    console.log('Income added (SQLite)');

    console.log('STEP 4: android path AFTER db.run');
  }

  async getIncomes(): Promise<Income[]> {

    if (Capacitor.getPlatform() === 'web') {
      console.log('Fetching Income (web):', this.webIncomes);
      return this.webIncomes;
    }

    const query = `
      SELECT id, amount, source, note, date, createdAt
      FROM incomes
      ORDER BY date DESC
    `;

    const result = await this.db.query(query);
    const rows = (result.values || []) as Income[];

    console.log('Fetching incomes (SQLite):', rows);
    return rows;
  }

  async addSavings(saving: Savings): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      const newSaving : Savings ={
        ...saving,
        id : Date.now(),
        createdAt: new Date(). toISOString()
      };
      this.webSavings.push(newSaving);
      return;
    }
  
    if (!this.dbReady) {
      await this.initDatabase();
      await this.createTables();
    }
  
    const query = `
      INSERT INTO savings (amount, type, note, date)
      VALUES (?, ?, ?, ?)
    `;
  
    await this.db.run(query, [
      saving.amount,
      saving.type,
      saving.note || '',
      saving.date
    ]);
  }

  async getSavings(): Promise<Savings[]> {
    if (Capacitor.getPlatform() === 'web') {
      return this.webSavings;
    }
  
    if (!this.dbReady) {
      await this.initDatabase();
      await this.createTables();
    }
  
    const result = await this.db.query(`SELECT * FROM savings ORDER BY date DESC`);
    return result.values as Savings[];
  }
  
}
