import { Budget, Transaction } from '@/types';
import { Card, CardContent, Typography, Box, IconButton, LinearProgress } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TransactionRow from '../transactions/TransactionRow';

const BudgetCard = ({ budget, transactions }: { budget: Budget; transactions: Transaction[] }) => {
    
    const spent = transactions
        .filter(t => t.category === budget.category && t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const remaining = budget.maximum - spent;
    const progress = (spent / budget.maximum) * 100;
    
    const latestTransactions = transactions
        .filter(t => t.category === budget.category)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

    return (
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ width: 14, height: 14, backgroundColor: budget.theme, borderRadius: '50%', mr: 1.5 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>{budget.category}</Typography>
                    <IconButton size="small">
                        <MoreHorizIcon />
                    </IconButton>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Maximum of ${budget.maximum.toFixed(2)}
                </Typography>
                
                <LinearProgress
                    variant="determinate"
                    value={progress > 100 ? 100 : progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'var(--color-Beige100)',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: budget.theme,
                        },
                        mb: 1
                    }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="body2">Spent: <Typography component="span" sx={{fontWeight: 'bold'}}>${spent.toFixed(2)}</Typography></Typography>
                    <Typography variant="body2">Remaining: <Typography component="span" sx={{fontWeight: 'bold', color: remaining < 0 ? 'var(--color-Red)' : 'inherit'}}>${remaining.toFixed(2)}</Typography></Typography>
                </Box>
                
                <Box sx={{ backgroundColor: 'var(--color-Beige100)', borderRadius: '15px', p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography sx={{fontWeight: 'bold'}}>Latest Spending</Typography>
                        <Typography variant="body2" sx={{color: 'var(--color-Green)'}}>See All</Typography>
                    </Box>
                    {latestTransactions.map((t, i) => <TransactionRow key={i} transaction={t} isSimple/>)}
                </Box>
            </CardContent>
        </Card>
    );
};

export default BudgetCard;
