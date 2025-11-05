import { Transaction } from '@/types';
import { Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import TransactionRow from '../transactions/TransactionRow';

const LatestSpending = ({ transactions, category }: { transactions: Transaction[], category: string }) => {
    const latestTransactions = transactions
        .filter(t => t.category === category)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <Box sx={{ backgroundColor: 'var(--color-Beige100)', borderRadius: '15px', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontWeight: 'bold' }}>Latest Spending</Typography>
                <Link component={NextLink} href="/transactions" variant="body2" sx={{ color: 'var(--color-Green)' }}>
                    See All
                </Link>
            </Box>
            {latestTransactions.length > 0 ? (
                latestTransactions.map((t, i) => <TransactionRow key={i} transaction={t} isSimple />)
            ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                    No spending recorded for this budget yet.
                </Typography>
            )}
        </Box>
    );
};

export default LatestSpending;
