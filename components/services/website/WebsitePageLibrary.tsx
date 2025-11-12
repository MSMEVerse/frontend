'use client';

import { useState } from 'react';
import { WebsitePage } from '@/lib/types';
import WebsitePageCard from './WebsitePageCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface WebsitePageLibraryProps {
  pages: WebsitePage[];
  selectedPageIds: string[];
  onPageSelect: (pageId: string) => void;
}

export default function WebsitePageLibrary({
  pages,
  selectedPageIds,
  onPageSelect,
}: WebsitePageLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPages = pages.filter((page) => {
    const matchesSearch = page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pagesByCategory = {
    ESSENTIAL: filteredPages.filter((p) => p.category === 'ESSENTIAL'),
    BUSINESS: filteredPages.filter((p) => p.category === 'BUSINESS'),
    MARKETING: filteredPages.filter((p) => p.category === 'MARKETING'),
    LEGAL: filteredPages.filter((p) => p.category === 'LEGAL'),
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ESSENTIAL">Essential</TabsTrigger>
          <TabsTrigger value="BUSINESS">Business</TabsTrigger>
          <TabsTrigger value="MARKETING">Marketing</TabsTrigger>
          <TabsTrigger value="LEGAL">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPages.map((page) => (
              <WebsitePageCard
                key={page.id}
                page={page}
                isSelected={selectedPageIds.includes(page.id)}
                onSelect={() => onPageSelect(page.id)}
              />
            ))}
          </div>
        </TabsContent>

        {Object.entries(pagesByCategory).map(([category, categoryPages]) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              {categoryPages.map((page) => (
                <WebsitePageCard
                  key={page.id}
                  page={page}
                  isSelected={selectedPageIds.includes(page.id)}
                  onSelect={() => onPageSelect(page.id)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

