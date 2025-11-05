import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/common/SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  it('renders an input with the correct placeholder', () => {
    render(<SearchBar placeholder="Test search" value="" onChange={() => {}} onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/test search/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('calls the onSearch callback when the user types', () => {
    const handleSearch = jest.fn();
    render(<SearchBar placeholder="Test search" value="" onChange={() => {}} onSearch={handleSearch} />);
    const inputElement = screen.getByPlaceholderText(/test search/i);
    
    fireEvent.change(inputElement, { target: { value: 'groceries' } });
    
    expect(handleSearch).toHaveBeenCalledWith('groceries');
  });
});
