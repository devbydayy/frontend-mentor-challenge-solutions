import { Pot } from '@/types';
import { Card, CardContent, Typography, Box, IconButton, LinearProgress, Button, Grid } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const PotCard = ({ pot }: { pot: Pot }) => {
    const progress = (pot.total / pot.target) * 100;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ width: 14, height: 14, backgroundColor: pot.theme, borderRadius: '50%', mr: 1.5 }} />
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>{pot.name}</Typography>
                    <IconButton size="small">
                        <MoreHorizIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
                    <Box>
                         <Typography variant="body2" color="text.secondary">Total Saved</Typography>
                         <Typography variant="h4" sx={{fontWeight: 'bold'}}>${pot.total.toFixed(2)}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">Target of ${pot.target.toFixed(2)}</Typography>
                </Box>

                 <LinearProgress
                    variant="determinate"
                    value={progress > 100 ? 100 : progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'var(--color-Beige100)',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: pot.theme,
                        },
                        mb: 1
                    }}
                />
                 <Typography variant="caption" color="text.secondary">{progress.toFixed(1)}%</Typography>

                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid item xs={6}>
                        <Button fullWidth variant='contained' sx={{backgroundColor: 'var(--color-Beige100)', color: 'var(--color-Grey900)', '&:hover': {backgroundColor: 'var(--color-Grey100)'}}}>+ Add Money</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant='contained' sx={{backgroundColor: 'var(--color-Beige100)', color: 'var(--color-Grey900)', '&:hover': {backgroundColor: 'var(--color-Grey100)'}}}>Withdraw</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PotCard;
