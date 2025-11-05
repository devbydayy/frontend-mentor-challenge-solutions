import { Transaction } from '@/types';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Box, Grid, Divider } from '@mui/material';

const formatCurrency = (amount: number) => {
    const value = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Math.abs(amount));
    return amount > 0 ? `+${value}` : `-${value}`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const TransactionRow = ({ transaction, isSimple = false }: { transaction: Transaction, isSimple?: boolean }) => {
    const isIncome = transaction.amount > 0;

    if (isSimple) {
        return (
             <ListItem disablePadding>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1.5 }}>
                    <ListItemAvatar sx={{minWidth: 50}}>
                        <Avatar src={transaction.avatar} alt={transaction.name} />
                    </ListItemAvatar>
                    <Box>
                         <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{transaction.name}</Typography>
                         <Typography variant="caption" color="text.secondary">{formatDate(transaction.date)}</Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'bold',
                            color: isIncome ? 'var(--color-Green)' : 'var(--color-Grey900)',
                            marginLeft: 'auto'
                        }}
                    >
                        {formatCurrency(transaction.amount)}
                    </Typography>
                </Box>
            </ListItem>
        );
    }

    return (
        <>
        <ListItem sx={{ py: 2 }}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={5} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemAvatar>
                            <Avatar src={transaction.avatar} alt={transaction.name} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="body1" sx={{ fontWeight: 'bold' }}>{transaction.name}</Typography>}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                    <ListItemText primary={transaction.category} />
                </Grid>
                <Grid item xs={4} sm={3} md={4}>
                    <ListItemText primary={formatDate(transaction.date)} />
                </Grid>
                <Grid item xs={4} sm={2} md={2} sx={{ textAlign: 'right' }}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 'bold',
                            color: isIncome ? 'var(--color-Green)' : 'var(--color-Grey900)',
                        }}
                    >
                        {formatCurrency(transaction.amount)}
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
        <Divider component="li" />
        </>
    );
};

export default TransactionRow;
