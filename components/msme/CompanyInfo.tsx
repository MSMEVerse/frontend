'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import ImageUpload from '@/components/upload/ImageUpload';

const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  tagline: z.string().optional(),
  description: z.string().optional(),
  instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
  categories: z.array(z.string()).optional(),
});

type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;

export default function CompanyInfo() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CompanyInfoFormData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      companyName: '',
      tagline: '',
      description: '',
      instagram: '',
      website: '',
      facebook: '',
      categories: [],
    },
  });

  const [logo, setLogo] = useState<string>('');

  const onSubmit = async (data: CompanyInfoFormData) => {
    try {
      // TODO: Call API to save company info
      console.log('Company info:', { ...data, logo });
      toast.success('Company information saved successfully');
    } catch (error) {
      toast.error('Failed to save company information');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>Update your company details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <ImageUpload
              value={logo}
              onChange={setLogo}
              maxSize={5 * 1024 * 1024} // 5MB
              accept="image/*"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              {...register('companyName')}
              className={errors.companyName ? 'border-red-500' : ''}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500">{errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              {...register('tagline')}
              placeholder="Your company tagline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Tell us about your company"
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <Label>Social Links</Label>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-sm text-muted-foreground">
                Instagram
              </Label>
              <Input
                id="instagram"
                type="url"
                {...register('instagram')}
                placeholder="https://instagram.com/yourcompany"
                className={errors.instagram ? 'border-red-500' : ''}
              />
              {errors.instagram && (
                <p className="text-sm text-red-500">{errors.instagram.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm text-muted-foreground">
                Website
              </Label>
              <Input
                id="website"
                type="url"
                {...register('website')}
                placeholder="https://yourcompany.com"
                className={errors.website ? 'border-red-500' : ''}
              />
              {errors.website && (
                <p className="text-sm text-red-500">{errors.website.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-sm text-muted-foreground">
                Facebook
              </Label>
              <Input
                id="facebook"
                type="url"
                {...register('facebook')}
                placeholder="https://facebook.com/yourcompany"
                className={errors.facebook ? 'border-red-500' : ''}
              />
              {errors.facebook && (
                <p className="text-sm text-red-500">{errors.facebook.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Product/Service Categories</Label>
            <p className="text-sm text-muted-foreground">
              Select categories that best describe your business
            </p>
            {/* TODO: Add multi-select for categories */}
            <Input placeholder="Technology, Fashion, Food, etc." />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

