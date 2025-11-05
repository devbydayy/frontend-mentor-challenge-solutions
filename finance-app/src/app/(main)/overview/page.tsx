import { Balance, Budget, Pot, Transaction } from '@/types';
import { Box, Grid, Typography } from '@mui/material';
import BalanceCards from '@/components/overview/BalanceCards';
import QuickPots from '@/components/overview/QuickPots';
import QuickTransactions from '@/components/overview/QuickTransactions';
import QuickBudgets from '@/components/overview/QuickBudgets';
import QuickRecurringBills from '@/components/overview/QuickRecurringBills';

async function getOverviewData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');

  const data = await res.json();
  const recurringBills = data.transactions.filter((t: Transaction) => t.recurring);

  return {
    balance: data.balance as Balance,
    pots: data.pots as Pot[],
    transactions: data.transactions as Transaction[],
    budgets: data.budgets as Budget[],
    recurringBills,
  };
}

export default async function OverviewPage() {
  const { balance, pots, transactions, budgets, recurringBills } = await getOverviewData();

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 4, color: 'var(--color-Grey900)' }}
      >
        Overview
      </Typography>

      <Box sx={{ mb: 3 }}>
        <BalanceCards balance={balance} />
      </Box>

      <Grid container spacing={3} alignItems="stretch">
        <Grid
          item
          xs={12}
          lg={6}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <QuickPots pots={pots} />

          <Box sx={{ height: 400 }}>
            <QuickTransactions transactions={transactions} />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <QuickBudgets budgets={budgets} transactions={transactions} />
          <QuickRecurringBills bills={recurringBills} />
        </Grid>
      </Grid>
    </Box>
  );
}
