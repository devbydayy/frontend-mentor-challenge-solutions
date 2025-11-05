'use client';
import { TextField, Button, Box, Typography } from '@mui/material';

const PotForm = ({ onCancel }: { onCancel: () => void }) => {
    return (
        <Box component="form" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>New Savings Pot</Typography>
            <TextField fullWidth label="Pot Name" margin="normal" />
            <TextField fullWidth label="Target Amount" type="number" margin="normal" />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" type="submit">Save Pot</Button>
            </Box>
        </Box>
    );
};

export default PotForm;
