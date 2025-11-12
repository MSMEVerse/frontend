'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { CampaignFilters as CampaignFiltersType } from '@/lib/types';
import { X, Filter, Calendar } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

interface CampaignFiltersProps {
  filters: CampaignFiltersType;
  onFiltersChange: (filters: CampaignFiltersType) => void;
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

const AVAILABLE_CATEGORIES = [
  'Technology', 'Software', 'Fashion', 'Food & Beverage', 'Lifestyle', 
  'Beauty', 'Travel', 'Fitness', 'Gaming', 'E-commerce', 'Education', 
  'Healthcare', 'Finance', 'Real Estate', 'Automotive'
];

export default function CampaignFilters({
  filters,
  onFiltersChange,
}: CampaignFiltersProps) {
  const [localFilters, setLocalFilters] = useState<CampaignFiltersType>(filters);

  const updateFilter = (key: keyof CampaignFiltersType, value: any) => {
    const newFilters = { ...localFilters };
    // Handle clearing - "__ALL__" means clear the filter
    if (value === '__ALL__' || value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
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

  const toggleArrayFilter = (key: 'categories' | 'status', value: string) => {
    const currentValues = (localFilters[key] as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    updateFilter(key, newValues.length > 0 ? newValues : undefined);
  };

  const clearFilters = () => {
    const clearedFilters: CampaignFiltersType = {};
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

      <div className="flex flex-wrap items-end gap-4 p-4 bg-muted/30 rounded-lg border">
        {/* Campaign Type Filter */}
        <div className="flex-1 min-w-[120px]">
          <Label className="text-xs text-muted-foreground mb-1 block">Type</Label>
          <Select
            value={localFilters.type || '__ALL__'}
            onValueChange={(value) => updateFilter('type', value)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Types</SelectItem>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="BARTER">Barter</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

        {/* Budget Range - Using Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-9 min-w-[200px] justify-between text-sm font-normal"
            >
              <span>
                {localFilters.minBudget !== undefined || localFilters.maxBudget !== undefined
                  ? `₹${((localFilters.minBudget || 0) / 1000).toFixed(0)}K - ₹${((localFilters.maxBudget || 100000) / 1000).toFixed(0)}K`
                  : 'Budget Range'}
              </span>
              <Filter className="h-3 w-3 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Budget Range: ₹{localFilters.minBudget || 0} - ₹{localFilters.maxBudget || 100000}
                </Label>
                <div className="mt-3 space-y-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Min Budget</Label>
                    <Slider
                      value={[localFilters.minBudget || 0]}
                      onValueChange={(value) => updateFilter('minBudget', value[0])}
                      min={0}
                      max={100000}
                      step={1000}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">Max Budget</Label>
                    <Slider
                      value={[localFilters.maxBudget || 100000]}
                      onValueChange={(value) => updateFilter('maxBudget', value[0])}
                      min={0}
                      max={100000}
                      step={1000}
                    />
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Categories Filter - Multi-select */}
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

        {/* Date Range Filter - Using Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-9 min-w-[200px] justify-between text-sm font-normal"
            >
              <span>
                {localFilters.startDate || localFilters.endDate
                  ? `${localFilters.startDate ? format(new Date(localFilters.startDate), 'MMM dd') : 'Start'} - ${localFilters.endDate ? format(new Date(localFilters.endDate), 'MMM dd') : 'End'}`
                  : 'Date Range'}
              </span>
              <Calendar className="h-3 w-3 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Campaign Date Range</Label>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">Start Date</Label>
                    <Input
                      type="date"
                      value={localFilters.startDate || ''}
                      onChange={(e) => updateFilter('startDate', e.target.value || undefined)}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">End Date</Label>
                    <Input
                      type="date"
                      value={localFilters.endDate || ''}
                      onChange={(e) => updateFilter('endDate', e.target.value || undefined)}
                      className="h-9 text-sm"
                      min={localFilters.startDate || undefined}
                    />
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

