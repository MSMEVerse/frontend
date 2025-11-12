'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WebsitePage } from '@/lib/types';
import { Check, Plus, Home, Info, Briefcase, Mail, Package, Users, Star, Image, FileText, HelpCircle, FolderOpen, Shield, RotateCcw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WebsitePageCardProps {
  page: WebsitePage;
  isSelected: boolean;
  onSelect: () => void;
}

const iconMap: Record<string, any> = {
  Home,
  Info,
  Briefcase,
  Mail,
  Package,
  Users,
  Star,
  Image,
  FileText,
  HelpCircle,
  FolderOpen,
  Shield,
  RotateCcw,
  AlertCircle,
};

export default function WebsitePageCard({ page, isSelected, onSelect }: WebsitePageCardProps) {
  const Icon = iconMap[page.icon || 'FileText'] || FileText;
  const isBasePage = page.price === 0;

  return (
    <Card
      className={cn(
        'hover:shadow-lg transition-all cursor-pointer',
        isSelected && 'ring-2 ring-primary'
      )}
      onClick={onSelect}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={cn(
              'p-2 rounded-lg',
              isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
            )}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{page.name}</h3>
                {isBasePage && (
                  <Badge variant="secondary" className="text-xs">Included</Badge>
                )}
                {isSelected && (
                  <Badge className="bg-green-600 dark:bg-green-600">
                    <Check className="h-3 w-3 mr-1" />
                    Selected
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{page.description}</p>
              {page.price > 0 && (
                <p className="text-lg font-bold">+₹{page.price.toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        {page.included && page.included.length > 0 && (
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">Includes:</p>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
              {page.included.slice(0, 3).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
              {page.included.length > 3 && (
                <li className="text-primary">+{page.included.length - 3} more</li>
              )}
            </ul>
          </div>
        )}

        <Button
          variant={isSelected ? 'outline' : 'default'}
          size="sm"
          className="w-full mt-4"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Selected
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Add Page
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

