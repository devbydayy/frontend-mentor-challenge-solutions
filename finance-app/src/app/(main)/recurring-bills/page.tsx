import { Box, Grid, Typography, Stack } from '@mui/material';
import BillList from '@/components/recurring-bills/BillList';
import { TotalBillsCard, BillsSummaryCard } from '@/components/recurring-bills/BillsSummary'; 
import { Transaction } from '@/types';


async function getBillsData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  const recurringBills = data.transactions.filter((t: Transaction) => t.recurring);
  return recurringBills as Transaction[];
}

export default async function RecurringBillsPage() {
  const bills = await getBillsData();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: 'var(--color-Grey900)' }}>
        Recurring Bills
      </Typography>
      
      <Grid container spacing={4}>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <TotalBillsCard bills={bills} />
            <BillsSummaryCard bills={bills} />
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
        <BillList initialBills={bills} />
        </Grid>

      </Grid>
    </Box>
  );
}
