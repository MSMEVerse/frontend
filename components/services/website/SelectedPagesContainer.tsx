'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WebsitePage } from '@/lib/types';
import { X, GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SelectedPagesContainerProps {
  pages: WebsitePage[];
  basePageIds: string[];
  onPageRemove: (pageId: string) => void;
  onPageReorder: (newOrder: string[]) => void;
}

export default function SelectedPagesContainer({
  pages,
  basePageIds,
  onPageRemove,
  onPageReorder,
}: SelectedPagesContainerProps) {
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
    if (dragIndex === dropIndex) return;

    const newOrder = [...pages];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(dropIndex, 0, removed);
    onPageReorder(newOrder.map((p) => p.id));
  };

  if (pages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Selected Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No pages selected. Drag pages from the library or click "Add Page" to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Pages ({pages.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {pages.map((page, index) => {
            const isBasePage = basePageIds.includes(page.id);
            return (
              <div
                key={page.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors cursor-move"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{page.name}</p>
                    {isBasePage && (
                      <Badge variant="secondary" className="text-xs">Base</Badge>
                    )}
                    {page.price > 0 && (
                      <Badge variant="outline" className="text-xs">
                        +₹{page.price.toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </div>
                {!isBasePage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageRemove(page.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

