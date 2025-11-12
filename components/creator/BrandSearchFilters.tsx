'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BrandFilters } from '@/lib/types';
import { X, Filter, Search } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface BrandSearchFiltersProps {
  filters: BrandFilters;
  onFiltersChange: (filters: BrandFilters) => void;
  onSearchChange?: (query: string) => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
];

const CITIES_BY_STATE: Record<string, string[]> = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Delhi': ['New Delhi', 'Delhi'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar'],
};

const AVAILABLE_NICHES = ['Technology', 'Fashion', 'Food', 'Lifestyle', 'Beauty', 'Travel', 'Fitness', 'Gaming'];
const AVAILABLE_CATEGORIES = ['Technology', 'Software', 'Fashion', 'Food & Beverage', 'Lifestyle', 'Beauty', 'Travel', 'Fitness', 'Gaming', 'E-commerce', 'Education', 'Healthcare', 'Finance', 'Real Estate', 'Automotive'];

export default function BrandSearchFilters({
  filters,
  onFiltersChange,
  onSearchChange,
}: BrandSearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<BrandFilters>(filters);
  const [searchQuery, setSearchQuery] = useState(filters.businessName || '');
  const [debouncedSearch, setDebouncedSearch] = useState(filters.businessName || '');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      onSearchChange?.(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearchChange]);

  const updateFilter = (key: keyof BrandFilters, value: any) => {
    const newFilters = { ...localFilters };
    // Handle clearing - "__ALL__" means clear the filter
    if (value === '__ALL__' || value === undefined || value === null) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    // If state changes or is cleared, reset city
    if (key === 'state') {
      if (value === '__ALL__' || value === undefined || value === null) {
        delete newFilters.city;
      } else if (value !== localFilters.state) {
        delete newFilters.city;
      }
    }
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: 'niche' | 'categories', value: string) => {
    const currentValues = localFilters[key] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    updateFilter(key, newValues.length > 0 ? newValues : undefined);
  };

  const clearFilters = () => {
    const clearedFilters: BrandFilters = {};
    setLocalFilters(clearedFilters);
    setSearchQuery('');
    onFiltersChange(clearedFilters);
    onSearchChange?.('');
  };

  const getAvailableCities = () => {
    if (localFilters.state && CITIES_BY_STATE[localFilters.state]) {
      return CITIES_BY_STATE[localFilters.state];
    }
    // Return all cities if no state selected
    return Array.from(new Set(Object.values(CITIES_BY_STATE).flat()));
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0 || searchQuery.length > 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Search & Filters</h3>
          {hasActiveFilters && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {Object.keys(localFilters).length + (searchQuery ? 1 : 0)}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search brands by name, tagline, or description..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateFilter('businessName', e.target.value || undefined);
            }}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4 p-4 bg-muted/30 rounded-lg border">
        {/* State Filter */}
        <div className="flex-1 min-w-[150px]">
          <Label className="text-xs text-muted-foreground mb-1 block">State</Label>
          <Select
            value={localFilters.state || '__ALL__'}
            onValueChange={(value) => updateFilter('state', value)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All States</SelectItem>
              {INDIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City Filter */}
        <div className="flex-1 min-w-[150px]">
          <Label className="text-xs text-muted-foreground mb-1 block">City</Label>
          <Select
            value={localFilters.city || '__ALL__'}
            onValueChange={(value) => updateFilter('city', value)}
            disabled={!localFilters.state}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder={localFilters.state ? "All Cities" : "Select state first"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Cities</SelectItem>
              {getAvailableCities().map((city) => (
                <SelectItem key={city} value={city.toLowerCase()}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Niche Filter - Multi-select */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-9 min-w-[150px] justify-between text-sm font-normal"
            >
              <span>
                {localFilters.niche && localFilters.niche.length > 0
                  ? `${localFilters.niche.length} Niche${localFilters.niche.length > 1 ? 's' : ''}`
                  : 'Niche'}
              </span>
              <Filter className="h-3 w-3 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Niches</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {AVAILABLE_NICHES.map((niche) => (
                  <div key={niche} className="flex items-center space-x-2">
                    <Checkbox
                      id={`niche-${niche}`}
                      checked={localFilters.niche?.includes(niche) || false}
                      onCheckedChange={() => toggleArrayFilter('niche', niche)}
                    />
                    <label
                      htmlFor={`niche-${niche}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {niche}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Category Filter - Multi-select */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-9 min-w-[150px] justify-between text-sm font-normal"
            >
              <span>
                {localFilters.categories && localFilters.categories.length > 0
                  ? `${localFilters.categories.length} Categor${localFilters.categories.length > 1 ? 'ies' : 'y'}`
                  : 'Category'}
              </span>
              <Filter className="h-3 w-3 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Categories</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {AVAILABLE_CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={localFilters.categories?.includes(category) || false}
                      onCheckedChange={() => toggleArrayFilter('categories', category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

