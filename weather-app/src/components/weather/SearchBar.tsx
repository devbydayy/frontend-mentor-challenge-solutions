import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../core/Input';
import Button from '../core/Button';
import { fetchLocations } from '@/lib/api';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { Location } from '@/types';

interface SearchFormInput {
  location: string;
}

interface SearchBarProps {
  onLocationSelect: (location: Location) => void;
}

export default function SearchBar({ onLocationSelect }: SearchBarProps) {
  const { register, handleSubmit, watch } = useForm<SearchFormInput>();
  const [showDropdown, setShowDropdown] = useState(false);

  const searchTerm = watch('location');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data: locations, isLoading } = useQuery({
    queryKey: ['locations', debouncedSearchTerm],
    queryFn: () => fetchLocations(debouncedSearchTerm),
    enabled: (debouncedSearchTerm?.length ?? 0) > 1,
  });

  const handleSelect = (location: Location) => {
    onLocationSelect(location);
    setShowDropdown(false);
  };

  const onSubmit: SubmitHandler<SearchFormInput> = () => {
    if (locations?.results && locations.results.length > 0) {
      handleSelect(locations.results[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-lg mx-auto flex flex flex-col gap-3 md:flex-row md:gap-2">
      <div className="relative flex-grow">
        <img src="/images/icon-search.svg" alt="Search" className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-300" />
        <Input
          {...register('location')}
          placeholder="Search for a place..."
          className="pl-12"
          onFocus={() => setShowDropdown(true)}
          autoComplete="off"
        />
        {showDropdown && (
          <div className="absolute z-1 top-full mt-2 w-full rounded-md shadow-lg bg-neutral-800 ring-1 ring-black ring-opacity-5">
            {isLoading && <div className="p-4 text-sm text-neutral-300">Searching...</div>}
            {locations?.results && locations.results.length > 0 && (
              <ul>
                {locations.results.map((loc) => (
                  <li
                    key={`${loc.latitude}-${loc.longitude}`}
                    onClick={() => handleSelect(loc)}
                    className="px-4 py-3 hover:bg-neutral-700 cursor-pointer text-left"
                  >
                    {loc.name}, {loc.admin1 ? `${loc.admin1}, ` : ''}{loc.country}
                  </li>
                ))}
              </ul>
            )}
            {!isLoading && locations?.results?.length === 0 && debouncedSearchTerm.length > 1 && (
                 <div className="p-4 text-sm text-neutral-300">No results found.</div>
            )}
          </div>
        )}
      </div>
      <Button type="submit" className="px-6 h-12">Search</Button>
    </form>
  );
}
