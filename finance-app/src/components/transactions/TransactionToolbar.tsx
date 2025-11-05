import { Box, TextField, InputAdornment, MenuItem, Select, FormControl, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    onSearch: (term: string) => void;
    onSort: (order: string) => void;
    onCategoryChange: (category: string) => void;
    sortOrder: string;
    category: string;
    categories: string[];
}

const TransactionToolbar = ({ onSearch, onSort, onCategoryChange, sortOrder, category, categories }: Props) => {
    
    const handleSortChange = (event: SelectChangeEvent) => {
        onSort(event.target.value as string);
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        onCategoryChange(event.target.value as string);
    };

    return (
        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
                variant="outlined"
                placeholder="Search transactions"
                onChange={(e) => onSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{ flexGrow: 1, minWidth: '200px' }}
            />
            <FormControl>
                 <Select
                    value={sortOrder}
                    onChange={handleSortChange}
                >
                    <MenuItem value="Latest">Latest</MenuItem>
                    <MenuItem value="Oldest">Oldest</MenuItem>
                </Select>
            </FormControl>
             <FormControl>
                <Select
                    value={category}
                    onChange={handleCategoryChange}
                >
                    {categories.map(cat => (
                         <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default TransactionToolbar;
