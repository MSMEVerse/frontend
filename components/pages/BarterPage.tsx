'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockBarterProducts, mockBarterDeals, mockBarterNegotiations } from '@/lib/mocks';
import { BarterProduct, BarterDeal } from '@/lib/types';
import ProductCatalog from '@/components/barter/ProductCatalog';
import ProductForm from '@/components/barter/ProductForm';
import BarterDealCard from '@/components/barter/BarterDealCard';
import BarterStats from '@/components/barter/BarterStats';
import { Plus, Package, Briefcase, MessageSquare, History, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function BarterPage() {
  const { user } = useAuth();
  const isMSME = user?.role === 'MSME';
  const isCreator = user?.role === 'CREATOR';
  
  const [selectedTab, setSelectedTab] = useState<string>(
    isMSME ? 'products' : 'browse'
  );
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<BarterProduct | null>(null);

  // Get user's products (for MSME)
  const myProducts = useMemo(() => {
    if (!isMSME || !user) return [];
    return mockBarterProducts.filter(p => p.brandId === user.id);
  }, [isMSME, user]);

  // Get active deals
  const activeDeals = useMemo(() => {
    if (!user) return [];
    return mockBarterDeals.filter(deal => {
      if (isMSME) {
        return deal.brandId === user.id && 
               ['NEGOTIATING', 'ACCEPTED', 'PRODUCT_SHIPPED', 'PRODUCT_DELIVERED', 'CONTENT_SUBMITTED', 'CONTENT_APPROVED'].includes(deal.status);
      } else {
        return deal.creatorId === user.id && 
               ['NEGOTIATING', 'ACCEPTED', 'PRODUCT_SHIPPED', 'PRODUCT_DELIVERED', 'CONTENT_SUBMITTED', 'CONTENT_APPROVED'].includes(deal.status);
      }
    });
  }, [user, isMSME]);

  // Get negotiations
  const negotiations = useMemo(() => {
    if (!user) return [];
    return mockBarterDeals.filter(deal => {
      if (isMSME) {
        return deal.brandId === user.id && deal.status === 'NEGOTIATING';
      } else {
        return deal.creatorId === user.id && deal.status === 'NEGOTIATING';
      }
    });
  }, [user, isMSME]);

  // Get history (completed deals)
  const history = useMemo(() => {
    if (!user) return [];
    return mockBarterDeals.filter(deal => {
      if (isMSME) {
        return deal.brandId === user.id && deal.status === 'COMPLETED';
      } else {
        return deal.creatorId === user.id && deal.status === 'COMPLETED';
      }
    });
  }, [user, isMSME]);

  // Get disputes
  const disputes = useMemo(() => {
    if (!user) return [];
    return mockBarterDeals.filter(deal => deal.status === 'DISPUTED' && 
      (deal.brandId === user.id || deal.creatorId === user.id));
  }, [user]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductFormOpen(true);
  };

  const handleEditProduct = (product: BarterProduct) => {
    setEditingProduct(product);
    setProductFormOpen(true);
  };

  const handleProposeBarter = (product: BarterProduct) => {
    // TODO: Navigate to deal creation or open negotiation modal
    // For now, create a deal in PENDING status
    console.log('Propose barter for product:', product.id);
    // This would typically open a modal to propose content value
    // For now, we'll just show a message
    alert('Barter proposal functionality - would open negotiation modal');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Barter Marketplace</h1>
          <p className="text-muted-foreground">
            {isMSME 
              ? 'Manage your product catalog and barter deals with creators'
              : 'Discover products and barter with brands for content creation'}
          </p>
        </div>
        {isMSME && (
          <Button onClick={handleAddProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        )}
      </div>

      <BarterStats 
        totalProducts={isMSME ? myProducts.length : mockBarterProducts.length}
        activeDeals={activeDeals.length}
        negotiations={negotiations.length}
        completedDeals={history.length}
        disputes={disputes.length}
      />

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          {isMSME ? (
            <>
              <TabsTrigger value="products">
                <Package className="h-4 w-4 mr-2" />
                My Products
              </TabsTrigger>
              <TabsTrigger value="deals">
                <Briefcase className="h-4 w-4 mr-2" />
                Active Deals
              </TabsTrigger>
              <TabsTrigger value="negotiations">
                <MessageSquare className="h-4 w-4 mr-2" />
                Negotiations
                {negotiations.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {negotiations.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="disputes">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Disputes
                {disputes.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-destructive text-destructive-foreground rounded-full">
                    {disputes.length}
                  </span>
                )}
              </TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="browse">
                <Package className="h-4 w-4 mr-2" />
                Browse
              </TabsTrigger>
              <TabsTrigger value="deals">
                <Briefcase className="h-4 w-4 mr-2" />
                Active Deals
              </TabsTrigger>
              <TabsTrigger value="negotiations">
                <MessageSquare className="h-4 w-4 mr-2" />
                Negotiations
                {negotiations.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                    {negotiations.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
              <TabsTrigger value="disputes">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Disputes
                {disputes.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-destructive text-destructive-foreground rounded-full">
                    {disputes.length}
                  </span>
                )}
              </TabsTrigger>
            </>
          )}
        </TabsList>

        {/* MSME: My Products Tab */}
        {isMSME && (
          <TabsContent value="products" className="space-y-4">
            {myProducts.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No products yet</p>
                <Button onClick={handleAddProduct}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Button>
              </div>
            ) : (
              <ProductCatalog 
                products={myProducts} 
                onEditProduct={handleEditProduct}
                showManageActions={true}
              />
            )}
          </TabsContent>
        )}

        {/* Creator: Browse Tab */}
        {isCreator && (
          <TabsContent value="browse" className="space-y-4">
            <ProductCatalog 
              products={mockBarterProducts}
              onProposeBarter={handleProposeBarter}
            />
          </TabsContent>
        )}

        {/* Active Deals Tab */}
        <TabsContent value="deals" className="space-y-4">
          {activeDeals.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No active deals</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeDeals.map((deal) => (
                <BarterDealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Negotiations Tab */}
        <TabsContent value="negotiations" className="space-y-4">
          {negotiations.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No active negotiations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {negotiations.map((deal) => (
                <BarterDealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <History className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No completed deals yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((deal) => (
                <BarterDealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="space-y-4">
          {disputes.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No disputes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {disputes.map((deal) => (
                <BarterDealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Product Form Dialog */}
      <Dialog open={productFormOpen} onOpenChange={setProductFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            onSuccess={() => {
              setProductFormOpen(false);
              setEditingProduct(null);
            }}
            onCancel={() => {
              setProductFormOpen(false);
              setEditingProduct(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

