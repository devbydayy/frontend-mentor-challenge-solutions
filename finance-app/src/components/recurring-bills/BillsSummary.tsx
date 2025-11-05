'use client';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { Transaction } from '@/types';
import Image from 'next/image';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

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

    const totalBills = uniqueLatestBills.reduce((acc, bill) => acc + bill.amount, 0);
    const paidAmount = paid.reduce((acc, bill) => acc + bill.amount, 0);
    const upcomingAmount = upcoming.reduce((acc, bill) => acc + bill.amount, 0);

    const dueSoonAmount = 0;
    const dueSoonCount = 0;

    return {
        total: Math.abs(totalBills),
        paid: {
            count: paid.length, 
            amount: Math.abs(paidAmount) 
        },
        upcoming: {
            count: upcoming.length,
            amount: Math.abs(upcomingAmount) 
        },
        dueSoon: {
            count: dueSoonCount, 
            amount: Math.abs(dueSoonAmount) 
        }
    };
};

export const TotalBillsCard = ({ bills }: { bills: Transaction[] }) => {
    const summary = getBillSummary(bills);

    return (
        <Paper 
            sx={{ 
                p: 3, 
                borderRadius: '20px', 
                backgroundColor: 'var(--color-Grey900)',
                color: 'var(--color-White)',
                height: 'fit-content' 
            }}
        >
            <Image 
                src="/images/icon-recurring-bills.svg" 
                alt="Bills" 
                width={32} 
                height={32} 
                style={{
                    filter: 'brightness(0) invert(1)' 
                }} 
            />
            
            <Typography variant="body1" sx={{ color: 'var(--color-Grey300)', mt: 1 }}>
                Total Bills
            </Typography>
            <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(summary.total)}
            </Typography>
        </Paper>
    );
};

export const BillsSummaryCard = ({ bills }: { bills: Transaction[] }) => {
    const summary = getBillSummary(bills);

    const summaryItems = [
        { 
            title: 'Paid Bills', 
            count: summary.paid.count, 
            amount: summary.paid.amount, 
            color: 'var(--color-Green)',
        },
        { 
            title: 'Total Upcoming', 
            count: summary.upcoming.count, 
            amount: summary.upcoming.amount, 
            color: 'var(--color-Grey900)', 
        },
        { 
            title: 'Due Soon', 
            count: summary.dueSoon.count, 
            amount: summary.dueSoon.amount, 
            color: summary.dueSoon.count > 0 ? 'var(--color-Red)' : 'var(--color-Red)',
        },
    ];

    return (
        <Paper sx={{ p: 3, borderRadius: '20px' }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Summary
            </Typography>
            
            <Box>
                {summaryItems.map((item, index) => (
                    <Box key={item.title}>
                        {index > 0 && (
                            <Divider sx={{ my: 1.5, borderColor: 'var(--color-Grey100)' }} />
                        )}

                        <Box 
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                py: 0.5 
                            }}
                        >
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: index === 2 ? item.color : 'var(--color-Grey900)', 
                                    fontWeight: 'medium' 
                                }}
                            >
                                {item.title}
                            </Typography>
                            
                            <Typography 
                                variant="body2" 
                                component="p" 
                                sx={{ 
                                    fontWeight: 'bold',
                                    color: item.color,
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {item.count} ({formatCurrency(item.amount)})
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};