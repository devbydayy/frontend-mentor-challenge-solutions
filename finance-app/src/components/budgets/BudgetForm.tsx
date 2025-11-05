'use client';
import { TextField, Button, Box, Typography } from '@mui/material';

const BudgetForm = ({ onCancel }: { onCancel: () => void }) => {
    return (
        <Box component="form" sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>New Budget</Typography>
            <TextField fullWidth label="Category Name" margin="normal" />
            <TextField fullWidth label="Maximum Amount" type="number" margin="normal" />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                <Button variant="contained" type="submit">Save</Button>
            </Box>
        </Box>
    );
};

export default BudgetForm;
