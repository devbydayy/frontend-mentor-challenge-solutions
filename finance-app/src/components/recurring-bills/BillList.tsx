'use client';
import { useState, useMemo } from 'react';
import { Typography, Paper, Stack, Grid, Box } from '@mui/material';
import { Transaction } from '@/types';
import BillRow from './BillRow';
import SearchBar from '@/components/common/SearchBar';
import SortMenu from '@/components/common/SortMenu';
import { useDebounce } from '@/hooks/useDebounce';

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'date-desc', label: 'Latest' },
  { value: 'date-asc', label: 'Oldest' },
  { value: 'amount-desc', label: 'Amount (High-Low)' },
  { value: 'amount-asc', label: 'Amount (Low-High)' },
];

export const BillList = ({ initialBills }: { initialBills: Transaction[] }) => {
  const [bills] = useState<Transaction[]>(initialBills ?? []);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOption>('date-desc');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredAndSortedBills = useMemo(() => {
    const list = bills ?? [];

    const filtered = debouncedSearchTerm
      ? list.filter((bill) =>
          bill.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      : list;

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        case 'date-desc':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return sorted;
  }, [bills, debouncedSearchTerm, sortOrder]);

  return (
    <Paper sx={{ p: 3, borderRadius: '20px', height: '100%' }}>
      <Grid container spacing={2} sx={{ mb: 3 }} alignItems="center">
        <Grid item xs={12} sm={8} md={9}>
          <SearchBar
            placeholder="Search bills"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <SortMenu
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            options={sortOptions}
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 1,
          borderBottom: '1px solid var(--color-Grey200)',
          color: 'var(--color-Grey600)',
        }}
      >
        <Typography variant="subtitle2" sx={{ flex: 2 }}>
          Bill Title
        </Typography>
        <Typography variant="subtitle2" sx={{ flex: 1 }}>
          Due Date
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ flex: 1, textAlign: 'right' }}
        >
          Amount
        </Typography>
      </Box>

      <Stack
        spacing={0}
        divider={<Box sx={{ borderBottom: '1px solid var(--color-Grey200)' }} />}
      >
        {filteredAndSortedBills.length > 0 ? (
          filteredAndSortedBills.map((bill, index) => (
            <BillRow key={index} bill={bill} />
          ))
        ) : (
          <Typography
            sx={{ textAlign: 'center', p: 3, color: 'var(--color-Grey500)' }}
          >
            No bills found.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default BillList;
