import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';

type SortMenuProps<T extends string> = {
  sortOrder: T;
  setSortOrder: (value: T) => void;
  options: { value: T; label: string }[];
};

function SortMenu<T extends string>({ sortOrder, setSortOrder, options }: SortMenuProps<T>) {
  const handleChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as T);
  };

  return (
    <FormControl>
      <Select value={sortOrder} onChange={handleChange}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SortMenu;
