import { Transaction } from '@/types';
import { ListItem, ListItemAvatar, Avatar, Typography, Box, Divider } from '@mui/material';
import React, { Fragment } from 'react';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const formatDueDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix = ['th', 'st', 'nd', 'rd'][
    day % 10 > 3 || (day % 100 >= 11 && day % 100 <= 13) ? 0 : day % 10
  ];
  return `Monthly - ${day}${suffix}`;
};

const getBillStatus = (dateString: string) => {
  const billDate = new Date(dateString);
  const now = new Date('2024-08-20T00:00:00Z'); 
  
  const billMonth = billDate.getMonth();
  const currentMonth = now.getMonth();

  const isPaid = billMonth === currentMonth;

  if (isPaid) {
    return { label: 'Paid', color: 'success' };
  } else {
    return { label: 'Upcoming', color: 'warning' };
  }
};

const BillRow = ({ bill }: { bill: Transaction }) => {
  const status = getBillStatus(bill.date);
  const dueDateText = formatDueDate(bill.date);

  return (
    <Fragment>
      <ListItem sx={{ py: 1.5, px: 3, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 2 }}>
          <ListItemAvatar sx={{ minWidth: 45 }}>
            <Avatar src={bill.avatar} alt={bill.name} />
          </ListItemAvatar>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {bill.name}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{ flex: 1, textAlign: 'center', color: 'var(--color-Grey600)' }}
        >
          {dueDateText}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            flex: 1,
            textAlign: 'right',
            fontWeight: 'bold',
            color: 'var(--color-Grey900)',
          }}
        >
          {formatCurrency(bill.amount)}
        </Typography>
      </ListItem>

      <Divider component="li" sx={{ listStyle: 'none' }} />
    </Fragment>
  );
};

export default BillRow;
