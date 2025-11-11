'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { CreatorFilters } from '@/lib/types';
import { X, Filter } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface MarketplaceFiltersProps {
  filters: CreatorFilters;
  onFiltersChange: (filters: CreatorFilters) => void;
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

export default function MarketplaceFilters({
  filters,
  onFiltersChange,
}: MarketplaceFiltersProps) {
  const [localFilters, setLocalFilters] = useState<CreatorFilters>(filters);

  const updateFilter = (key: keyof CreatorFilters, value: any) => {
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

  const clearFilters = () => {
    const clearedFilters: CreatorFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getAvailableCities = () => {
    if (localFilters.state && CITIES_BY_STATE[localFilters.state]) {
      return CITIES_BY_STATE[localFilters.state];
    }
    // Return all cities if no state selected
    return Array.from(new Set(Object.values(CITIES_BY_STATE).flat()));
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Filters</h3>
          {hasActiveFilters && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {Object.keys(localFilters).length}
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

      <div className="flex flex-wrap items-end gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
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

        {/* Deal Type Filter */}
        <div className="flex-1 min-w-[120px]">
          <Label className="text-xs text-muted-foreground mb-1 block">Deal Type</Label>
          <Select
            value={localFilters.dealType || '__ALL__'}
            onValueChange={(value) => updateFilter('dealType', value as 'BARTER' | 'PAID' | 'BOTH' | '__ALL__')}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Types</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="BARTER">Barter</SelectItem>
              <SelectItem value="BOTH">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Follower Range - Using Popover for better UX */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-9 min-w-[180px] justify-between text-sm font-normal"
            >
              <span>
                {localFilters.followerRange
                  ? `${localFilters.followerRange[0]}K - ${localFilters.followerRange[1]}K`
                  : 'Followers'}
              </span>
              <Filter className="h-3 w-3 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Follower Range: {localFilters.followerRange?.[0] || 0}K -{' '}
                  {localFilters.followerRange?.[1] || 1000}K
                </Label>
                <Slider
                  value={localFilters.followerRange || [0, 1000]}
                  onValueChange={(value) => updateFilter('followerRange', value)}
                  min={0}
                  max={1000}
                  step={10}
                  className="mt-3"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Budget Range - Using Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-9 min-w-[200px] justify-between text-sm font-normal"
            >
              <span>
                {localFilters.budgetRange
                  ? `₹${(localFilters.budgetRange[0] / 1000).toFixed(0)}K - ₹${(localFilters.budgetRange[1] / 1000).toFixed(0)}K`
                  : 'Budget Range'}
              </span>
              <Filter className="h-3 w-3 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Budget Range: ₹{localFilters.budgetRange?.[0] || 0} - ₹
                  {localFilters.budgetRange?.[1] || 100000}
                </Label>
                <Slider
                  value={localFilters.budgetRange || [0, 100000]}
                  onValueChange={(value) => updateFilter('budgetRange', value)}
                  min={0}
                  max={100000}
                  step={1000}
                  className="mt-3"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
