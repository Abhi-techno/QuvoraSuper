
"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function BrowsePage() {
  const categories = [
    { id: 'mobiles', name: 'Mobiles & Tablets', icon: '📱', count: '1,245' },
    { id: 'cars', name: 'Cars', icon: '🚗', count: '890' },
    { id: 'bikes', name: 'Bikes & Scooters', icon: '🏍️', count: '560' },
    { id: 'electronics', name: 'Electronics', icon: '💻', count: '2,100' },
    { id: 'furniture', name: 'Furniture', icon: '🛋️', count: '430' },
    { id: 'appliances', name: 'Home Appliances', icon: '❄️', count: '320' },
    { id: 'fashion', name: 'Fashion & Clothing', icon: '👕', count: '1,500' },
    { id: 'jobs', name: 'Jobs', icon: '💼', count: '245' },
    { id: 'realestate', name: 'Real Estate', icon: '🏠', count: '670' },
    { id: 'services', name: 'Services', icon: '🛠️', count: '120' },
    { id: 'books', name: 'Books & Hobbies', icon: '📚', count: '890' },
    { id: 'pets', name: 'Pets', icon: '🐕', count: '145' },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 pt-4 pb-20 animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative flex items-center group">
        <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
        <Input 
          className="pl-10 h-12 glass rounded-2xl border-none" 
          placeholder="Search categories..." 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/browse/${cat.id}`}>
            <Card className="glass border-none overflow-hidden hover:scale-[1.02] transition-transform active:scale-95">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <span className="text-4xl">{cat.icon}</span>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{cat.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1">{cat.count} ads</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
