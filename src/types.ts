export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number | string;
  description: string;
  originalAmount: number;
  originalCurrency: string;
  amount: number;
  displayCurrency: string;
  type: TransactionType;
  category: string;
  date: string;
  note?: string;
  memberId?: string | number;
  rateAtReceipt?: number | null;
  timestamp: string;
  editedAt?: string | null;
}

export interface Project {
  name: string;
  budget: number;
  currency: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadline?: string;
}

export interface BudgetLimit {
  [category: string]: number;
}
