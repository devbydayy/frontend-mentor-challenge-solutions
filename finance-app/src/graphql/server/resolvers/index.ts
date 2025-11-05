import path from 'path';
import fs from 'fs';
import { AppData, Transaction } from '@/types';

const dataFilePath = path.join(process.cwd(), 'public', 'data.json');
const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
const data: AppData = JSON.parse(jsonData);

export const resolvers = {
  Query: {
    balance: () => data.balance,
    transactions: () => data.transactions,
    budgets: () => data.budgets.map(budget => {
        const spent = data.transactions
            .filter(t => t.category === budget.category && t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return {
            ...budget,
            spent,
            remaining: budget.maximum - spent,
            transactions: data.transactions
                .filter(t => t.category === budget.category)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        };
    }),
    pots: () => data.pots,
    recurringBills: () => data.transactions.filter((t: Transaction) => t.recurring),
  },
  Mutation: {
    addBudget: (_: any, { category, maximum }: { category: string, maximum: number }) => {
      console.log(`Adding budget: ${category} with max ${maximum}`);
      const newBudget = { category, maximum, theme: '#CCCCCC' };
      return newBudget;
    },
    updatePot: (_: any, { name, amount }: { name: string, amount: number }) => {
        console.log(`Updating pot ${name} with amount ${amount}`);
        const pot = data.pots.find(p => p.name === name);
        if (pot) {
            return pot;
        }
        return null;
    }
  },
};
