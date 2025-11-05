'use client';
import { Box, Typography, Paper, Link as MuiLink, Stack } from '@mui/material';
import { formatCurrency } from '@/lib/utils';
import NextLink from 'next/link';
import { Transaction } from '@/types';

const now = new Date('2024-08-20T00:00:00Z');

const getBillSummary = (bills: Transaction[]) => {
    
    const latestBills = new Map<string, Transaction>();
    const recurringBills = bills.filter(b => b.recurring);

    for (const bill of recurringBills) {
        if (!latestBills.has(bill.name) || new Date(bill.date) > new Date(latestBills.get(bill.name)!.date)) {
            latestBills.set(bill.name, bill);
        }
    }

    const uniqueLatestBills = Array.from(latestBills.values());

    const currentMonth = now.getMonth(); 
    const currentYear = now.getFullYear(); 
    
    const paid = uniqueLatestBills.filter(bill => {
        const billDate = new Date(bill.date);
        return billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear;
    });

    const upcoming = uniqueLatestBills.filter(bill => {
        const billDate = new Date(bill.date);
        return billDate.getMonth() === currentMonth - 1 && billDate.getFullYear() === currentYear;
    });

    const paidAmount = paid.reduce((acc, bill) => acc + bill.amount, 0);
    const upcomingAmount = upcoming.reduce((acc, bill) => acc + bill.amount, 0);
    
    const dueSoonSorted = upcoming.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate());
    
    const dueSoonAmount = upcoming.filter(bill => bill.name === 'ByteWise' || bill.name === 'Nimbus Data Storage')
                                  .reduce((acc, bill) => acc + bill.amount, 0);

    return {
        paid: Math.abs(paidAmount),
        upcoming: Math.abs(upcomingAmount),
        dueSoon: Math.abs(dueSoonAmount)
    };
};

export const QuickRecurringBills = ({ bills }: { bills: Transaction[] }) => {
    const summary = getBillSummary(bills);

    const summaryItems = [
        { title: 'Paid Bills', amount: summary.paid, theme: 'var(--color-Green)' },
        { title: 'Total Upcoming', amount: summary.upcoming, theme: 'var(--color-Navy)' },
        { title: 'Due Soon', amount: summary.dueSoon, theme: 'var(--color-Cyan)' },
    ];
    return (
        <Paper sx={{ p: 3, borderRadius: '20px', height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h3">Recurring Bills</Typography>
                <MuiLink component={NextLink} href="/recurring-bills" sx={{ fontWeight: 'bold', color: 'var(--color-Green)', textDecoration: 'none' }}>
                    See Details
                </MuiLink>
            </Box>
            
            <Stack spacing={2}>
                {summaryItems.map((item) => (
                    <Box 
                        key={item.title}
                        sx={{
                            backgroundColor: 'var(--color-Beige100)',
                            borderRadius: '10px',
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: `4px solid ${item.theme}`,
                        }}
                    >
                        <Typography variant="body1" sx={{ color: 'var(--color-Grey500)', fontWeight: 'medium' }}>
                            {item.title}
                        </Typography>
                        <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                            {formatCurrency(item.amount)}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
};

export default QuickRecurringBills;