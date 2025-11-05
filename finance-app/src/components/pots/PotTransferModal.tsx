'use client';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import Modal from '../common/Modal';

interface Props {
    open: boolean;
    onClose: () => void;
    potName: string;
}

const PotTransferModal = ({ open, onClose, potName }: Props) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Manage '{potName}'</Typography>
                <TextField fullWidth label="Amount" type="number" margin="normal" />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained">+ Add Money</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="outlined">Withdraw</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default PotTransferModal;
