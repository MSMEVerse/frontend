'use client';

import { useState, useMemo } from 'react';
import { BarterProduct } from '@/lib/types';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

interface ProductCatalogProps {
  products: BarterProduct[];
  onEditProduct?: (product: BarterProduct) => void;
  onDeleteProduct?: (productId: string) => void;
  onProposeBarter?: (product: BarterProduct) => void;
  showManageActions?: boolean;
}

export default function ProductCatalog({
  products,
  onEditProduct,
  onDeleteProduct,
  onProposeBarter,
  showManageActions = false,
}: ProductCatalogProps) {
  const [filters, setFilters] = useState<{
    category?: string;
    minValue?: number;
    maxValue?: number;
    search?: string;
  }>({});

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !product.name.toLowerCase().includes(searchLower) &&
          !product.description.toLowerCase().includes(searchLower) &&
          !product.category.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      if (filters.category && product.category !== filters.category) {
        return false;
      }

      if (filters.minValue !== undefined && product.estimatedValue < filters.minValue) {
        return false;
      }

      if (filters.maxValue !== undefined && product.estimatedValue > filters.maxValue) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  return (
    <div className="space-y-4">
      <ProductFilters filters={filters} onFiltersChange={setFilters} />
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">
            {Object.keys(filters).length > 0
              ? 'No products match your filters. Try adjusting your search criteria.'
              : 'No products available'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
              onProposeBarter={onProposeBarter}
              showManageActions={showManageActions}
            />
          ))}
        </div>
      )}
    </div>
  );
}

