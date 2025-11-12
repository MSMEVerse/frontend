'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import ImageUpload from '@/components/upload/ImageUpload';
import { Instagram, Youtube, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function CreatorPortfolioPage() {
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [instagramHandle, setInstagramHandle] = useState('');
  const [youtubeHandle, setYoutubeHandle] = useState('');
  const [publicProfileLink, setPublicProfileLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleImageUpload = (url: string) => {
    setPortfolioImages((prev) => [...prev, url]);
  };

  const handleRemoveImage = (index: number) => {
    setPortfolioImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicProfileLink);
    setLinkCopied(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Portfolio</h1>
        <p className="text-muted-foreground">
          Showcase your work and connect your social handles
        </p>
      </div>

      {/* Portfolio Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Content</CardTitle>
          <CardDescription>Upload your best work samples</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioImages.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(index)}
                >
                  ×
                </Button>
              </div>
            ))}
            {portfolioImages.length < 12 && (
              <div className="border-2 border-dashed rounded-lg flex items-center justify-center h-32">
                <ImageUpload
                  value=""
                  onChange={handleImageUpload}
                  maxSize={10 * 1024 * 1024}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Social Handles */}
      <Card>
        <CardHeader>
          <CardTitle>Social Handles</CardTitle>
          <CardDescription>Connect your social media accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center space-x-2">
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </Label>
            <Input
              id="instagram"
              placeholder="@yourhandle"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Engagement stats will be automatically fetched
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube" className="flex items-center space-x-2">
              <Youtube className="h-4 w-4" />
              <span>YouTube</span>
            </Label>
            <Input
              id="youtube"
              placeholder="@yourchannel"
              value={youtubeHandle}
              onChange={(e) => setYoutubeHandle(e.target.value)}
            />
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Followers: 50,000</p>
                <p className="text-sm text-muted-foreground">Engagement: 4.5%</p>
              </div>
              <Badge>Verified</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Public Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Public Profile</CardTitle>
          <CardDescription>Share your profile with brands</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              value={publicProfileLink || 'https://msmeverse.com/creator/your-profile'}
              readOnly
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleCopyLink}
            >
              {linkCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <Button>Enable Public Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}


