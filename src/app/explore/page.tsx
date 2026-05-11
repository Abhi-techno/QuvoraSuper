'use client';

import React, { use } from 'react';
import { Search, MapPin, Sparkles, ChevronRight, TrendingUp, Heart, ShoppingBag, Briefcase, Home, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
    { label: 'Mobiles', icon: '📱', color: 'bg-blue-50 text-blue-500' },
    { label: 'Cars', icon: '🚗', color: 'bg-orange-50 text-orange-500' },
    { label: 'Jobs', icon: '💼', color: 'bg-purple-50 text-purple-500' },
    { label: 'Rentals', icon: '🏠', color: 'bg-green-50 text-green-500' },
    { label: 'Courses', icon: '🎓', color: 'bg-pink-50 text-pink-500' },
    { label: 'Electronics', icon: '💻', color: 'bg-cyan-50 text-cyan-500' },
    { label: 'Furniture', icon: '🛋️', color: 'bg-amber-50 text-amber-500' },
    { label: 'Bikes', icon: '🏍️', color: 'bg-red-50 text-red-500' },
  ];

  const featuredListings = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max',
      price: '₹1,15,000',
      location: 'Bandra, Mumbai',
      image: 'https://picsum.photos/seed/f1/400/400',
      category: 'Mobiles'
    },
    {
      id: '2',
      title: 'Modern L-Shaped Sofa',
      price: '₹28,500',
      location: 'Powai, Mumbai',
      image: 'https://picsum.photos/seed/f2/400/400',
      category: 'Furniture'
    }
  ];

  return (
    <div className="flex flex-col gap-8 px-5 pt-6 pb-24 animate-in fade-in duration-700">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Welcome back</p>
          <h1 className="text-xl font-black">Arjun Varma</h1>
        </div>
        <Button variant="ghost" className="h-10 px-3 glass rounded-full flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold">Mumbai</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          className="h-14 pl-11 pr-4 bg-white border-none rounded-2xl shadow-sm placeholder:text-muted-foreground/50 text-sm font-medium" 
          placeholder="Search jobs, mobiles, rentals..." 
        />
      </div>

      {/* Hero Slider */}
      <section className="relative h-48 rounded-3xl overflow-hidden shadow-xl shadow-primary/5">
        <Image 
          src="https://picsum.photos/seed/hero/800/400" 
          alt="Quvora Promo" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
          <Badge className="w-fit mb-2 bg-primary/20 backdrop-blur-md text-white border-none text-[8px] font-bold uppercase tracking-wider">AI Recommendation</Badge>
          <h2 className="text-white text-xl font-black leading-tight">Trending Jobs in Tech<br/>Near Mumbai</h2>
          <Link href="/browse" className="text-white/60 text-[10px] font-bold mt-2 flex items-center gap-1">
            Explore All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* Quick Categories */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="font-black text-sm uppercase tracking-wider">Categories</h3>
          <Link href="/browse" className="text-[10px] font-bold text-primary">See All</Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {mainCategories.map((cat) => (
            <Link key={cat.label} href={`/browse/${cat.label.toLowerCase()}`}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-transform active:scale-90 ${cat.color}`}>
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feed Section */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="font-black text-sm uppercase tracking-wider">Nearby Listings</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredListings.map((item) => (
            <Link key={item.id} href={`/listing/${item.id}`}>
              <Card className="border-none bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2 glass p-1.5 rounded-full">
                    <Heart className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
                <CardContent className="p-3.5 flex flex-col gap-1">
                  <p className="text-[8px] font-bold text-primary uppercase tracking-widest">{item.category}</p>
                  <h4 className="text-xs font-bold truncate">{item.title}</h4>
                  <p className="text-sm font-black text-foreground mt-0.5">{item.price}</p>
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-muted-foreground">
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
