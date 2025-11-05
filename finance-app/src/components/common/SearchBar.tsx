import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

interface Props {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
}

const SearchBar = ({ placeholder, value, onChange, onSearch }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onSearch) onSearch(value);
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ flexGrow: 1, minWidth: '200px' }}
    />
  );
};

export default SearchBar;
