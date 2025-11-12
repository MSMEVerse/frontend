'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarterProduct, BarterProductStatus } from '@/lib/types';
import { toast } from 'sonner';

interface ProductFormProps {
  product?: BarterProduct | null;
  onSuccess: () => void;
  onCancel: () => void;
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

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    category: string;
    estimatedValue: string;
    quantity: string;
    status: BarterProductStatus;
    images: string[];
  }>({
    name: '',
    description: '',
    category: '',
    estimatedValue: '',
    quantity: '',
    status: 'ACTIVE',
    images: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        estimatedValue: product.estimatedValue.toString(),
        quantity: product.quantity.toString(),
        status: product.status,
        images: product.images || [],
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.estimatedValue || Number(formData.estimatedValue) <= 0) {
      toast.error('Please enter a valid estimated value');
      return;
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }

    // TODO: Call API to save product
    console.log('Saving product:', formData);
    toast.success(product ? 'Product updated successfully!' : 'Product created successfully!');
    onSuccess();
  };

  const handleImageAdd = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setFormData({
        ...formData,
        images: [...formData.images, url],
      });
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your product..."
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: any) => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="estimatedValue">Estimated Value (₹) *</Label>
          <Input
            id="estimatedValue"
            type="number"
            value={formData.estimatedValue}
            onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
            placeholder="0"
            min="0"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="0"
            min="1"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Product Images</Label>
        <div className="space-y-2">
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input value={image} readOnly className="flex-1" />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleImageRemove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleImageAdd}>
            Add Image URL
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {product ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}

