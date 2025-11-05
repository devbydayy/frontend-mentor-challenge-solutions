'use client';

import { Budget, Transaction } from '@/types';
import { Typography, Box, Divider, Paper } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const BudgetSummary = ({ budgets, transactions }: { budgets: Budget[]; transactions: Transaction[] }) => {

    const budgetData = budgets.map(budget => {
        const spent = transactions
            .filter(t => t.category === budget.category && t.amount < 0)
            .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return {
            name: budget.category,
            value: spent,
            fill: budget.theme
        };
    });

    const totalSpent = budgetData.reduce((sum, item) => sum + item.value, 0);
    const totalLimit = budgets.reduce((sum, item) => sum + item.maximum, 0);

    return (
        <Paper sx={{ height: '100%', p: 3, borderRadius: '20px' }}>
            <Box sx={{ width: '100%', height: 250, position: 'relative', mb: 4 }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                            data={budgetData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            innerRadius="80%" 
                            outerRadius="100%" 
                            paddingAngle={0} 
                            stroke="none" 
                        >
                            {budgetData.map((entry, index) => (
                                <Cell key={`outer-cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>

                        <Pie 
                            data={budgetData} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            innerRadius="67%" 
                            outerRadius="80%" 
                            paddingAngle={0} 
                            stroke="none" 
                            fillOpacity={0.7} 
                        >
                            {budgetData.map((entry, index) => (
                                <Cell key={`inner-cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                 <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}>
                    <Typography variant='h3' sx={{fontWeight: 'bold', mb: 0}}>
                        {formatCurrency(totalSpent).replace(/\.\d{2}/, '')}
                    </Typography> 
                    <Typography variant='body2' sx={{ color: 'var(--color-Grey500)', mt: 0 }}>
                        of {formatCurrency(totalLimit).replace(/\.\d{2}/, '')} limit
                    </Typography>
                </Box>
            </Box>

            <Typography variant="h5" sx={{mb: 2, fontWeight: 'bold'}}>
                Spending Summary
            </Typography>

            <Box>
                {budgetData.map((item, index) => {
                    const limit = budgets.find(b => b.category === item.name)?.maximum || 0;
                    const limitDisplay = formatCurrency(limit);

                    return (
                        <Box key={item.name}>
                            {index > 0 && <Divider sx={{ my: 1 }} />}

                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    py: 1.5,
                                    position: 'relative', 
                                    pl: 3, 
                                }}
                            >
                                <Box 
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        top: '50%',
                                        transform: 'translateY(-50%)', 
                                        width: '4px',
                                        height: '50%', 
                                        backgroundColor: item.fill,
                                        borderRadius: '2px', 
                                    }}
                                />

                                <Typography variant="body1">{item.name}</Typography>

                                <Typography variant="body1" sx={{fontWeight: 'medium'}}>
                                    {formatCurrency(item.value)} of {limitDisplay}
                                </Typography>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
};

export default BudgetSummary;
