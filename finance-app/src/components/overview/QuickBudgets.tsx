'use client';

import { Box, Typography, Paper, Link as MuiLink, Stack } from '@mui/material';
import { formatCurrency } from '@/lib/utils';
import NextLink from 'next/link';
import { Budget, Transaction } from '@/types';
import { BudgetDoughnut } from '@/components/charts/BudgetDoughnut';

type QuickBudgetsProps = {
  budgets: Budget[];
  transactions: Transaction[];
};

export default function QuickBudgets({ budgets, transactions }: QuickBudgetsProps) {
  const getSpentForCategory = (category: string) => {
    return transactions
      .filter(t => t.category === category && t.amount < 0)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  };

  const budgetData = budgets.map(budget => {
    const spent = getSpentForCategory(budget.category);
    return {
      ...budget,
      spent: spent,
      value: spent,
    };
  });

  const totalSpent = budgetData.reduce((acc, b) => acc + b.spent, 0);
  const totalLimit = budgetData.reduce((acc, b) => acc + b.maximum, 0);

  return (
    <Paper sx={{ p: 3, borderRadius: '20px', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h3">Budgets</Typography>
        <MuiLink
          component={NextLink}
          href="/budgets"
          sx={{
            fontWeight: 'bold',
            color: 'var(--color-Green)',
            textDecoration: 'none',
          }}
        >
          See Details
        </MuiLink>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        <Box
          sx={{
            flex: '0 0 auto',
            minWidth: 240,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '180px',
          }}
        >
          <BudgetDoughnut
            data={budgetData}
            totalSpent={totalSpent}
            totalLimit={totalLimit}
          />
        </Box>

        <Stack
          spacing={2}
          sx={{
            flex: '1 1 auto',
            alignItems: { xs: 'center', sm: 'flex-end' },
            mt: { xs: 3, sm: 0 },
          }}
        >
          {budgetData.map((budget, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 140,
                height: 60,
                borderLeft: `4px solid ${budget.theme}`,
                pl: 1.5,
                boxSizing: 'border-box',
              }}
            >
              <Box sx={{ textAlign: 'left', width: '100%' }}>
                <Typography
                  sx={{ color: 'var(--color-Grey500)', lineHeight: 2.2, fontSize: '16px' }}
                >
                  {budget.category}
                </Typography>
                <Typography
                  component="p"
                  sx={{ fontWeight: 'bold', lineHeight: 2.2, fontSize: '14px' }}
                >
                  {formatCurrency(budget.spent)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Paper>
  );
}
