'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Save, Plus, X } from 'lucide-react';

export default function CreatorProfileInfo() {
  const [bio, setBio] = useState('');
  const [niche, setNiche] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [followerCount, setFollowerCount] = useState('');
  const [engagementRate, setEngagementRate] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dealType, setDealType] = useState<'BARTER' | 'PAID' | 'BOTH'>('BOTH');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [youtubeHandle, setYoutubeHandle] = useState('');
  const [tiktokHandle, setTiktokHandle] = useState('');
  const [newNiche, setNewNiche] = useState('');

  const availableNiches = ['Technology', 'Fashion', 'Food', 'Lifestyle', 'Beauty', 'Travel', 'Fitness', 'Gaming'];
  const availablePlatforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'Facebook'];

  const handleAddNiche = () => {
    if (newNiche && !niche.includes(newNiche)) {
      setNiche([...niche, newNiche]);
      setNewNiche('');
    }
  };

  const handleRemoveNiche = (nicheToRemove: string) => {
    setNiche(niche.filter((n) => n !== nicheToRemove));
  };

  const handleAddPlatform = (platform: string) => {
    if (!platforms.includes(platform)) {
      setPlatforms([...platforms, platform]);
    }
  };

  const handleRemovePlatform = (platformToRemove: string) => {
    setPlatforms(platforms.filter((p) => p !== platformToRemove));
  };

  const handleSave = async () => {
    try {
      // TODO: Call API to update profile
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Creator Information</CardTitle>
        <CardDescription>
          Update your creator profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself and your content..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />
        </div>

        {/* Niche */}
        <div className="space-y-2">
          <Label>Niche</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {niche.map((n) => (
              <Badge key={n} variant="secondary" className="flex items-center gap-1">
                {n}
                <button
                  type="button"
                  onClick={() => handleRemoveNiche(n)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Select value={newNiche} onValueChange={setNewNiche}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select niche" />
              </SelectTrigger>
              <SelectContent>
                {availableNiches
                  .filter((n) => !niche.includes(n))
                  .map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button type="button" onClick={handleAddNiche} variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <Label>Platforms</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {platforms.map((p) => (
              <Badge key={p} variant="secondary" className="flex items-center gap-1">
                {p}
                <button
                  type="button"
                  onClick={() => handleRemovePlatform(p)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {availablePlatforms
              .filter((p) => !platforms.includes(p))
              .map((p) => (
                <Button
                  key={p}
                  type="button"
                  onClick={() => handleAddPlatform(p)}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {p}
                </Button>
              ))}
          </div>
        </div>

        {/* Social Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="followerCount">Follower Count</Label>
            <Input
              id="followerCount"
              type="number"
              placeholder="50000"
              value={followerCount}
              onChange={(e) => setFollowerCount(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="engagementRate">Engagement Rate (%)</Label>
            <Input
              id="engagementRate"
              type="number"
              step="0.1"
              placeholder="4.5"
              value={engagementRate}
              onChange={(e) => setEngagementRate(e.target.value)}
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-2">
          <Label htmlFor="startingPrice">Starting Price (₹)</Label>
          <Input
            id="startingPrice"
            type="number"
            placeholder="10000"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="Maharashtra"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Mumbai"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        {/* Deal Type */}
        <div className="space-y-2">
          <Label htmlFor="dealType">Deal Type</Label>
          <Select value={dealType} onValueChange={(value: 'BARTER' | 'PAID' | 'BOTH') => setDealType(value)}>
            <SelectTrigger id="dealType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PAID">Paid</SelectItem>
              <SelectItem value="BARTER">Barter</SelectItem>
              <SelectItem value="BOTH">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Social Handles */}
        <div className="space-y-4">
          <Label>Social Handles</Label>
          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-sm text-muted-foreground">
              Instagram
            </Label>
            <Input
              id="instagram"
              placeholder="@yourhandle"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube" className="text-sm text-muted-foreground">
              YouTube
            </Label>
            <Input
              id="youtube"
              placeholder="@yourchannel"
              value={youtubeHandle}
              onChange={(e) => setYoutubeHandle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktok" className="text-sm text-muted-foreground">
              TikTok
            </Label>
            <Input
              id="tiktok"
              placeholder="@yourhandle"
              value={tiktokHandle}
              onChange={(e) => setTiktokHandle(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}


