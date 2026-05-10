
"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MoreVertical, 
  Eye, 
  MessageSquare, 
  BarChart3, 
  Edit3, 
  Trash2, 
  ArrowUpCircle,
  Package,
  Search,
  Filter
} from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function MyAdsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const myAds = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max - 256GB',
      price: '₹1,24,900',
      category: 'Mobiles',
      status: 'Active',
      views: 154,
      responses: 12,
      image: 'https://picsum.photos/seed/ip15/200/200',
      date: 'Post date: 24 May 2024'
    },
    {
      id: '2',
      title: 'Royal Enfield Classic 350',
      price: '₹1,85,000',
      category: 'Bikes',
      status: 'Active',
      views: 890,
      responses: 45,
      image: 'https://picsum.photos/seed/bike/200/200',
      date: 'Post date: 20 May 2024'
    },
    {
      id: '3',
      title: 'Modern L-Shaped Sofa',
      price: '₹28,500',
      category: 'Furniture',
      status: 'Pending',
      views: 0,
      responses: 0,
      image: 'https://picsum.photos/seed/sofa/200/200',
      date: 'Post date: Today'
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'Mobiles', label: 'Mobiles' },
    { id: 'Bikes', label: 'Bikes' },
    { id: 'Cars', label: 'Cars' },
    { id: 'Furniture', label: 'Furniture' },
    { id: 'Jobs', label: 'Jobs' },
  ];

  const filteredAds = activeCategory === 'all' 
    ? myAds 
    : myAds.filter(ad => ad.category === activeCategory);

  return (
    <div className="flex flex-col gap-6 px-4 pt-4 pb-24 animate-in fade-in duration-500">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
        <Input 
          className="pl-10 h-12 glass rounded-2xl border-none" 
          placeholder="Search my ads..." 
        />
      </div>

      <section>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 pb-2">
            {categories.map((cat) => (
              <Button 
                key={cat.id} 
                variant={activeCategory === cat.id ? 'default' : 'outline'}
                className="h-9 glass border-none rounded-full px-5 text-xs font-bold"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </section>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full glass rounded-xl grid grid-cols-3">
          <TabsTrigger value="active" className="text-xs font-bold">Active</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs font-bold">Pending</TabsTrigger>
          <TabsTrigger value="expired" className="text-xs font-bold">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4 flex flex-col gap-3">
          {filteredAds.filter(ad => ad.status === 'Active').map((ad) => (
            <AdManagementCard key={ad.id} ad={ad} />
          ))}
          {filteredAds.filter(ad => ad.status === 'Active').length === 0 && (
            <EmptyState message="No active ads in this category" />
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-4 flex flex-col gap-3">
          {filteredAds.filter(ad => ad.status === 'Pending').map((ad) => (
            <AdManagementCard key={ad.id} ad={ad} />
          ))}
          {filteredAds.filter(ad => ad.status === 'Pending').length === 0 && (
            <EmptyState message="No pending ads" />
          )}
        </TabsContent>

        <TabsContent value="expired" className="mt-4 flex flex-col gap-3">
          <EmptyState message="No closed ads" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AdManagementCard({ ad }: { ad: any }) {
  return (
    <Card className="glass border-none overflow-hidden">
      <CardContent className="p-0">
        <div className="flex p-3 gap-4">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={ad.image} alt={ad.title} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm truncate">{ad.title}</h3>
                <p className="text-primary font-bold text-base mt-0.5">{ad.price}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{ad.date}</p>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8 -mr-2">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[11px] font-bold">{ad.views}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[11px] font-bold">{ad.responses}</span>
              </div>
              {ad.status === 'Active' && (
                <Badge variant="outline" className="ml-auto text-[8px] h-4 bg-green-500/10 text-green-500 border-green-500/20 uppercase tracking-widest">Live</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 grid grid-cols-3 divide-x divide-white/5">
          <Button variant="ghost" className="h-10 rounded-none text-[10px] font-bold gap-2">
            <Edit3 className="w-3.5 h-3.5" />
            Edit
          </Button>
          <Button variant="ghost" className="h-10 rounded-none text-[10px] font-bold gap-2 text-accent">
            <ArrowUpCircle className="w-3.5 h-3.5" />
            Boost
          </Button>
          <Button variant="ghost" className="h-10 rounded-none text-[10px] font-bold gap-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-4">
      <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-muted-foreground/20">
        <Package className="w-8 h-8" />
      </div>
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </div>
  );
}
