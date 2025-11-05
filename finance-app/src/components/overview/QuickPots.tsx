'use client';
import { Box, Typography, Paper, Grid, Link as MuiLink } from '@mui/material';
import { formatCurrency } from '@/lib/utils';
import NextLink from 'next/link';
import Image from 'next/image';
import { Pot } from '@/types';

type QuickPotsProps = {
  pots: Pot[];
};

export default function QuickPots({ pots }: QuickPotsProps) {
  const totalSaved = pots.reduce((acc, pot) => acc + pot.total, 0);
  const quickPots = pots.slice(0, 4);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: '20px',
        height: 'auto',
        display: 'block',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h3">Pots</Typography>
        <MuiLink
          component={NextLink}
          href="/pots"
          sx={{
            fontWeight: 'bold',
            color: 'var(--color-Green)',
            textDecoration: 'none',
          }}
        >
          See Details
        </MuiLink>
      </Box>

      <Grid container spacing={2} alignItems="flex-start" sx={{ height: 'auto' }}>
        <Grid item xs={12} sm={5} md={5}>
          <Box
            sx={{
              backgroundColor: 'var(--color-Beige100)',
              borderRadius: '15px',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '150px',
            }}
          >
            <Image src="/images/icon-pot.svg" alt="Pot Icon" width={32} height={32} />
            <Typography variant="body2" sx={{ color: 'var(--color-Grey500)', mt: 1 }}>
              Total Saved
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{ fontWeight: 'bold', color: 'var(--color-Grey900)' }}
            >
              {formatCurrency(totalSaved)}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={7} md={7}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            {quickPots.map((pot, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  borderLeft: `4px solid ${pot.theme}`,
                  pl: 1.5,
                }}
              >
                <Typography variant="body1" sx={{ color: 'var(--color-Grey500)' }}>
                  {pot.name}
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ fontWeight: 'bold', color: 'var(--color-Grey900)' }}
                >
                  {formatCurrency(pot.total)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
