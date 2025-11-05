import { Pagination as MuiPagination, Box } from '@mui/material';

interface Props {
    count: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination = ({ count, page, onChange }: Props) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <MuiPagination count={count} page={page} onChange={onChange} />
        </Box>
    );
};

export default Pagination;
