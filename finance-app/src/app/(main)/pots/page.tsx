import { Pot } from '@/types';
import { Box, Button, Grid, Typography } from '@mui/material';
import PotCard from '@/components/pots/PotCard';
import AddIcon from '@mui/icons-material/Add';


async function getPotsData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`);
  if (!res.ok) throw new Error('Failed to fetch data');
  const data = await res.json();
  return data.pots as Pot[];
}

export default async function PotsPage() {
  const pots = await getPotsData();

  return (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--color-Grey900)' }}>
                Pots
            </Typography>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    backgroundColor: 'var(--color-Grey900)',
                    color: 'var(--color-White)',
                    borderRadius: '20px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'var(--color-Grey500)',
                    },
                }}
            >
                Add New Pot
            </Button>
        </Box>
      <Grid container spacing={3}>
        {pots.map((pot) => (
          <Grid item xs={12} sm={6} key={pot.name}>
            <PotCard pot={pot} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
