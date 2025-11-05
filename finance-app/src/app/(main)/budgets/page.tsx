import { Budget, Transaction } from '@/types';
import { Box, Button, Grid, Typography } from '@mui/material';
import BudgetSummary from '@/components/budgets/BudgetSummary';
import BudgetCard from '@/components/budgets/BudgetCard';
import AddIcon from '@mui/icons-material/Add';


async function getBudgetsData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return {
    budgets: data.budgets as Budget[],
    transactions: data.transactions as Transaction[],
  };
}

export default async function BudgetsPage() {
  const { budgets: originalBudgets, transactions } = await getBudgetsData();

  const desiredOrder = [
    "Dining Out",
    "Personal Care",
    "Bills",
    "Entertainment"
  ];

  const budgets = originalBudgets.sort((a, b) => {
    return desiredOrder.indexOf(a.category) - desiredOrder.indexOf(b.category);
  });
  
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--color-Grey900)' }}>
          Budgets
        </Typography>
        <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
                backgroundColor: 'var(--color-Grey900)',
                color: 'var(--color-White)',
                borderRadius: '20px',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: 'var(--color-Grey500)',
                },
            }}
        >
            Add New Budget
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5} lg={4}>
          <BudgetSummary budgets={budgets} transactions={transactions} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
            <Grid container spacing={3}>
                {budgets.map((budget) => (
                    <Grid item xs={12} key={budget.category}>
                        <BudgetCard budget={budget} transactions={transactions} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
