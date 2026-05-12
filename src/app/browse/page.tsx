"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function BrowsePage() {
  const categories = [
    { id: 'mobiles', name: 'Mobiles & Tablets', icon: '📱', count: '1,245', color: 'bg-blue-500/10' },
    { id: 'cars', name: 'Cars', icon: '🚗', count: '890', color: 'bg-orange-500/10' },
    { id: 'bikes', name: 'Bikes & Scooters', icon: '🏍️', count: '560', color: 'bg-red-500/10' },
    { id: 'electronics', name: 'Electronics', icon: '💻', count: '2,100', color: 'bg-cyan-500/10' },
    { id: 'furniture', name: 'Furniture', icon: '🛋️', count: '430', color: 'bg-amber-500/10' },
    { id: 'appliances', name: 'Home Appliances', icon: '❄️', count: '320', color: 'bg-blue-400/10' },
    { id: 'fashion', name: 'Fashion & Clothing', icon: '👕', count: '1,500', color: 'bg-pink-500/10' },
    { id: 'jobs', name: 'Jobs', icon: '💼', count: '245', color: 'bg-purple-500/10' },
    { id: 'realestate', name: 'Real Estate', icon: '🏠', count: '670', color: 'bg-green-500/10' },
    { id: 'services', name: 'Services', icon: '🛠️', count: '120', color: 'bg-gray-500/10' },
    { id: 'books', name: 'Books & Hobbies', icon: '📚', count: '890', color: 'bg-yellow-500/10' },
    { id: 'pets', name: 'Pets', icon: '🐕', count: '145', color: 'bg-brown-500/10' },
  ];

  return (
    <div className="flex flex-col gap-6 px-5 pt-6 pb-28 animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative flex items-center group">
        <Search className="absolute left-4 w-4 h-4 text-muted-foreground/60" />
        <Input 
          className="pl-11 h-12 glass rounded-2xl border-none shadow-sm font-bold text-sm" 
          placeholder="Search categories..." 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/browse/${cat.id}`}>
            <Card className="glass border-none overflow-hidden hover:scale-[1.02] transition-all active:scale-95 shadow-sm group bg-card">
              <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 rounded-3xl ${cat.color} flex items-center justify-center text-3xl shadow-inner`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-black text-[11px] uppercase tracking-widest text-foreground/80 leading-tight">{cat.name}</h3>
                  <p className="text-[9px] font-bold text-muted-foreground/60 mt-2 uppercase tracking-tighter">{cat.count} listings</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}