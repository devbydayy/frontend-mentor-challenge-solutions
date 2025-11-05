'use client';
import { LinearProgress, Box, Typography } from '@mui/material';

interface Props {
    total: number;
    target: number;
    themeColor: string;
}

const PotProgressBar = ({ total, target, themeColor }: Props) => {
    const progress = (total / target) * 100;
    return (
        <Box>
            <LinearProgress
                variant="determinate"
                value={progress > 100 ? 100 : progress}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'var(--color-Beige100)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: themeColor,
                    },
                    mb: 0.5
                }}
            />
            <Typography variant="caption" color="text.secondary">{progress.toFixed(1)}%</Typography>
        </Box>
    );
};

export default PotProgressBar;
