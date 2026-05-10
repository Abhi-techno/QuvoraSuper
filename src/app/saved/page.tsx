
"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SavedItemsPage() {
  const savedItems = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max',
      price: '₹1,24,900',
      location: 'Bandra, Mumbai',
      image: 'https://picsum.photos/seed/ip15/400/400',
      status: 'Available'
    },
    {
      id: '2',
      title: 'Royal Enfield Classic 350',
      price: '₹1,85,000',
      location: 'Andheri, Mumbai',
      image: 'https://picsum.photos/seed/bike/400/400',
      status: 'Sold'
    }
  ];

  if (savedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center gap-4">
        <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-muted-foreground/30">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold">No saved items</h2>
        <p className="text-sm text-muted-foreground">Save items you love by tapping the heart icon on any listing.</p>
        <Link href="/">
          <Card className="glass border-none px-6 py-2 font-bold text-primary mt-4">Start Browsing</Card>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 pt-4 pb-20 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 gap-4">
        {savedItems.map((item) => (
          <Link key={item.id} href={`/listing/${item.id}`}>
            <Card className="glass border-none overflow-hidden relative">
              <div className="relative aspect-square">
                <Image src={item.image} alt={item.title} fill className={`object-cover ${item.status === 'Sold' ? 'grayscale opacity-50' : ''}`} />
                {item.status === 'Sold' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Sold</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 glass p-1.5 rounded-full">
                  <Heart className="w-4 h-4 text-primary fill-primary" />
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                <p className="text-lg font-bold text-primary mt-1">{item.price}</p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                  <MapPin className="w-2.5 h-2.5" />
                  <span className="truncate">{item.location}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
