'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { X, Filter } from 'lucide-react';

interface ProductFiltersProps {
  filters: {
    category?: string;
    minValue?: number;
    maxValue?: number;
    search?: string;
  };
  onFiltersChange: (filters: any) => void;
}

const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Food & Beverage',
  'Beauty',
  'Fitness',
  'Home & Living',
  'Travel',
  'Gaming',
  'Other',
];

export default function ProductFilters({
  filters,
  onFiltersChange,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...localFilters };
    if (value === '__ALL__' || value === '' || value === undefined) {
      delete newFilters[key as keyof typeof newFilters];
    } else {
      newFilters[key as keyof typeof newFilters] = value;
    }
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
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
        <div className="flex-1 min-w-[200px]">
          <Label className="text-xs text-muted-foreground mb-1 block">Search</Label>
          <Input
            placeholder="Search products..."
            value={localFilters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="h-9"
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <Label className="text-xs text-muted-foreground mb-1 block">Category</Label>
          <Select
            value={localFilters.category || '__ALL__'}
            onValueChange={(value) => updateFilter('category', value)}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__ALL__">All Categories</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 min-w-[120px]">
          <Label className="text-xs text-muted-foreground mb-1 block">Min Value</Label>
          <Input
            type="number"
            placeholder="Min"
            value={localFilters.minValue || ''}
            onChange={(e) => updateFilter('minValue', e.target.value ? Number(e.target.value) : undefined)}
            className="h-9"
          />
        </div>

        <div className="flex-1 min-w-[120px]">
          <Label className="text-xs text-muted-foreground mb-1 block">Max Value</Label>
          <Input
            type="number"
            placeholder="Max"
            value={localFilters.maxValue || ''}
            onChange={(e) => updateFilter('maxValue', e.target.value ? Number(e.target.value) : undefined)}
            className="h-9"
          />
        </div>
      </div>
    </div>
  );
}

