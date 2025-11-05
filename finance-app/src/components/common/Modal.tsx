import { Modal as MuiModal, Box, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 0,
};

const Modal = ({ open, onClose, children }: Props) => {
    return (
        <MuiModal open={open} onClose={onClose}>
            <Paper sx={style}>
                 <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </Paper>
        </MuiModal>
    );
};

export default Modal;
