import { Balance } from '@/types';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const BalanceCard = ({ title, amount, primary = false }: { title: string, amount: number, primary?: boolean }) => (
    <Card sx={{
        backgroundColor: primary ? 'var(--color-Grey900)' : 'var(--color-White)',
        color: primary ? 'var(--color-White)' : 'var(--color-Grey900)',
        height: '100%'
    }}>
        <CardContent>
            <Typography variant="body2" sx={{ color: primary ? 'var(--color-Grey300)' : 'var(--color-Grey500)', mb: 1 }}>
                {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(amount)}
            </Typography>
        </CardContent>
    </Card>
);

const BalanceCards = ({ balance }: { balance: Balance }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <BalanceCard title="Current Balance" amount={balance.current} primary />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <BalanceCard title="Income" amount={balance.income} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <BalanceCard title="Expenses" amount={balance.expenses} />
            </Grid>
        </Grid>
    );
};

export default BalanceCards;
