import { Transaction } from '@/types';
import { Card, CardContent, Typography, Box, Link, List } from '@mui/material';
import NextLink from 'next/link';
import TransactionRow from '../transactions/TransactionRow';

const QuickTransactions = ({ transactions }: { transactions: Transaction[] }) => {
  const latestTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: { xs: 300, md: 460 },
        display: 'flex',
        flexDirection: 'column',
        px: 2, 
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="h5">Transactions</Typography>
          <Link
            component={NextLink}
            href="/transactions"
            variant="body2"
            sx={{ color: 'var(--color-Green)', fontWeight: 500 }}
          >
            View All
          </Link>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <List
            disablePadding
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            {latestTransactions.map((transaction, index) => (
              <TransactionRow key={index} transaction={transaction} isSimple />
            ))}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickTransactions;
