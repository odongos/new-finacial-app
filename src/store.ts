import { useState, useEffect } from 'react';
import { Transaction, Project, Goal, BudgetLimit } from './types';

export function useFinanceData() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [budgetLimits, setBudgetLimits] = useState<BudgetLimit>({});
  const [baseCurrency, setBaseCurrency] = useState('USD');

  useEffect(() => {
    try {
      const txs = JSON.parse(localStorage.getItem('financeTransactions') || '[]');
      setTransactions(txs);

      const proj = JSON.parse(localStorage.getItem('financeProject') || 'null');
      setProject(proj);

      const savedGoals = JSON.parse(localStorage.getItem('vtSavingsGoals') || '[]');
      setGoals(savedGoals);

      const limits = JSON.parse(localStorage.getItem('vtBudgetLimits') || '{}');
      setBudgetLimits(limits);

      const currency = localStorage.getItem('financeBaseCurrency') || 'USD';
      setBaseCurrency(currency);
    } catch (e) {
      console.error('Error loading data from local storage', e);
    }
  }, []);

  return { transactions, project, goals, budgetLimits, baseCurrency };
}
