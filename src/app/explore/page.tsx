'use client';

import React, { use } from 'react';
import { Search, MapPin, Sparkles, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function ExplorePage({
  params,
  searchParams
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  use(params);
  use(searchParams);

  const mainCategories = [
    { label: 'Mobiles', icon: '📱', color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Cars', icon: '🚗', color: 'bg-orange-500/10 text-orange-500' },
    { label: 'Jobs', icon: '💼', color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Rentals', icon: '🏠', color: 'bg-green-500/10 text-green-500' },
    { label: 'Electronics', icon: '💻', color: 'bg-cyan-500/10 text-cyan-500' },
    { label: 'Furniture', icon: '🛋️', color: 'bg-amber-500/10 text-amber-500' },
    { label: 'Bikes', icon: '🏍️', color: 'bg-red-500/10 text-red-500' },
    { label: 'Fashion', icon: '👕', color: 'bg-pink-500/10 text-pink-500' },
  ];

  const featuredListings = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max',
      price: '₹1,15,000',
      location: 'Bandra, Mumbai',
      image: 'https://picsum.photos/seed/f1/400/400',
      category: 'Mobiles',
      isHot: true
    },
    {
      id: '2',
      title: 'Modern L-Shaped Sofa',
      price: '₹28,500',
      location: 'Powai, Mumbai',
      image: 'https://picsum.photos/seed/f2/400/400',
      category: 'Furniture',
      isHot: false
    },
    {
      id: '3',
      title: 'Royal Enfield Classic 350',
      price: '₹1,85,000',
      location: 'Andheri, Mumbai',
      image: 'https://picsum.photos/seed/bike/400/400',
      category: 'Bikes',
      isHot: true
    },
    {
      id: '4',
      title: 'MacBook Air M2',
      price: '₹85,000',
      location: 'Colaba, Mumbai',
      image: 'https://picsum.photos/seed/mac/400/400',
      category: 'Electronics',
      isHot: false
    }
  ];

  return (
    <div className="flex flex-col gap-8 px-5 pt-4 pb-32 animate-in fade-in duration-700">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Welcome back</p>
          <h1 className="text-2xl font-black tracking-tighter">Arjun Varma</h1>
        </div>
        <Button variant="ghost" className="h-10 px-4 glass rounded-full flex items-center gap-2 border-none">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold">Mumbai</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          className="h-14 pl-11 pr-4 glass border-none rounded-[1.5rem] shadow-sm placeholder:text-muted-foreground/40 text-sm font-bold" 
          placeholder="Search items, jobs, rentals..." 
        />
      </div>

      {/* Hero Slider */}
      <section className="relative h-52 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10">
        <Image 
          src="https://picsum.photos/seed/hero/800/400" 
          alt="Quvora Promo" 
          fill 
          className="object-cover"
          priority
          data-ai-hint="modern city"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-primary/20 backdrop-blur-md text-white border-none text-[8px] font-black uppercase tracking-widest">AI Recommendation</Badge>
          </div>
          <h2 className="text-white text-2xl font-black leading-tight tracking-tight">Trending Jobs in Tech<br/>Near Mumbai</h2>
          <Link href="/browse" className="text-white/60 text-[10px] font-bold mt-2 flex items-center gap-1 group">
            Explore All <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Quick Categories */}
      <section>
        <div className="flex items-center justify-between mb-5 px-1">
          <h3 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Main Categories</h3>
          <Link href="/browse" className="text-[10px] font-black text-primary uppercase tracking-widest">See All</Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {mainCategories.map((cat) => (
            <Link key={cat.label} href={`/browse/${cat.label.toLowerCase()}`}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-xl shadow-sm transition-all active:scale-90 hover:scale-105 ${cat.color} glass border-none`}>
                  {cat.icon}
                </div>
                <span className="text-[9px] font-black text-muted-foreground/80 uppercase tracking-tighter">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feed Section */}
      <section>
        <div className="flex items-center justify-between mb-5 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-black text-[10px] uppercase tracking-widest text-muted-foreground">Nearby Listings</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredListings.map((item) => (
            <Link key={item.id} href={`/listing/${item.id}`}>
              <Card className="border-none bg-card rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all active:scale-[0.98] group">
                <div className="relative aspect-square">
                  <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 glass p-2 rounded-full border-none">
                    <Heart className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </div>
                  {item.isHot && (
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 glass rounded-full border-none flex items-center gap-1">
                      <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[7px] font-black uppercase text-red-600 tracking-widest">Hot</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4 flex flex-col gap-1.5">
                  <p className="text-[8px] font-black text-primary/60 uppercase tracking-widest">{item.category}</p>
                  <h4 className="text-[13px] font-bold leading-tight line-clamp-1">{item.title}</h4>
                  <p className="text-base font-black text-foreground">{item.price}</p>
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-muted-foreground font-medium">
                    <MapPin className="w-2.5 h-2.5" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
