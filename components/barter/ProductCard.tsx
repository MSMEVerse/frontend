'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarterProduct } from '@/lib/types';
import { Edit, Trash2, Package, IndianRupee } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: BarterProduct;
  onEdit?: (product: BarterProduct) => void;
  onDelete?: (productId: string) => void;
  onProposeBarter?: (product: BarterProduct) => void;
  showManageActions?: boolean;
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  onProposeBarter,
  showManageActions = false,
}: ProductCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={product.status === 'ACTIVE' ? 'default' : 'secondary'}>
            {product.status}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{product.estimatedValue.toLocaleString()}</span>
          </div>
          <Badge variant="outline">{product.category}</Badge>
        </div>
        {product.brand && (
          <p className="text-xs text-muted-foreground">
            by {product.brand.profile?.companyName || `${product.brand.firstName} ${product.brand.lastName}`}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Quantity: {product.quantity}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        {showManageActions ? (
          <>
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onEdit(product)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
          </>
        ) : (
          onProposeBarter && (
            <Button
              className="flex-1"
              onClick={() => onProposeBarter(product)}
            >
              Propose Barter
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
}

