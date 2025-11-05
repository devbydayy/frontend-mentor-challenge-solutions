import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Props {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
    options: string[];
}

const FilterDropdown = ({ value, onChange, options }: Props) => {
    return (
        <FormControl>
            <Select value={value} onChange={onChange}>
                {options.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterDropdown;
