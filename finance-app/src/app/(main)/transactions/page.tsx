'use client';

import { Transaction } from '@/types';
import TransactionList from '@/components/transactions/TransactionList';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/data.json');
                const data = await res.json();
                setTransactions(data.transactions);
            } catch (error) {
                console.error("Failed to fetch transactions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: 'var(--color-Grey900)' }}>
                Transactions
            </Typography>
            <TransactionList initialTransactions={transactions} />
        </Box>
    );
}
