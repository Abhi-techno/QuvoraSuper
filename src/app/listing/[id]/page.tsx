
"use client"

import React, { use } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Eye, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Sparkles,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

export default function ListingDetailPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<any>;
}) {
  const router = useRouter();
  // Unwrap params and searchParams for Next.js 15
  const { id } = use(params);
  use(searchParams);

  // Mock data
  const listing = {
    title: 'iPhone 15 Pro Max - 256GB (Natural Titanium)',
    price: '₹1,24,900',
    location: 'Bandra West, Mumbai',
    time: '2 hours ago',
    views: '154',
    saves: '23',
    condition: 'Like New',
    description: 'Selling my 3-month-old iPhone 15 Pro Max. Perfect condition, no scratches. Comes with box and original cable. Battery health is 100%. Under warranty until May 2025.',
    category: 'Mobiles',
    images: [
      'https://picsum.photos/seed/iphone1/800/600',
      'https://picsum.photos/seed/iphone2/800/600',
      'https://picsum.photos/seed/iphone3/800/600',
    ],
    seller: {
      name: 'Aditya Gupta',
      rating: 4.9,
      since: 'Jan 2022',
      avatar: 'https://picsum.photos/seed/seller1/150/150',
      verified: true
    }
  };

  return (
    <div className="flex flex-col gap-0 pb-32 animate-in fade-in duration-500">
      {/* Gallery Section */}
      <div className="relative h-[45vh] w-full">
        <ScrollArea className="h-full w-full">
          <div className="flex h-full">
            {listing.images.map((img, i) => (
              <div key={i} className="relative min-w-full h-[45vh]">
                <Image src={img} alt="Product" fill sizes="100vw" className="object-cover" priority={i === 0} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        
        {/* Gallery Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 glass px-3 py-1.5 rounded-full">
          {listing.images.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 pt-6 flex flex-col gap-6 -mt-6 rounded-t-3xl bg-background relative z-10">
        <div>
          <div className="flex justify-between items-start">
            <Badge variant="secondary" className="glass bg-accent/10 text-accent border-none mb-2">NEGOTIABLE</Badge>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Eye className="w-3 h-3" /> {listing.views}</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Heart className="w-3 h-3" /> {listing.saves}</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-primary leading-tight">{listing.price}</h1>
          <h2 className="text-xl font-semibold mt-1 leading-snug">{listing.title}</h2>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{listing.time}</span>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="glass-thick p-4 rounded-2xl flex items-start gap-4 border-l-4 border-primary">
          <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm">AI Price Insight</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Fair Price. Similar iPhones sold for ₹1.20L - ₹1.30L in Bandra recently.</p>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass p-3 rounded-xl">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Condition</p>
            <p className="text-sm font-bold mt-0.5">{listing.condition}</p>
          </div>
          <div className="glass p-3 rounded-xl">
            <p className="text-[10px] text-muted-foreground uppercase font-bold">Category</p>
            <p className="text-sm font-bold mt-0.5">{listing.category}</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {listing.description}
          </p>
          <Button variant="link" className="text-primary w-fit p-0 h-auto font-bold text-sm">Show More</Button>
        </div>

        {/* Seller Card */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Seller Profile</h3>
          <Card className="glass border-none">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border border-white/20">
                  <AvatarImage src={listing.seller.avatar} />
                  <AvatarFallback>{listing.seller.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-sm">{listing.seller.name}</h4>
                    {listing.seller.verified && <ShieldCheck className="w-4 h-4 text-primary fill-primary/10" />}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex items-center gap-0.5 text-yellow-500">
                      <StarIcon size={10} />
                      <span className="text-[10px] font-bold">{listing.seller.rating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Joined {listing.seller.since}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        {/* Safety Banner */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl flex items-start gap-4 mb-10">
          <HelpCircle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-yellow-600">Safety Tip</h4>
            <p className="text-[10px] text-yellow-700/80 mt-0.5">Always meet in public places. Do not pay any amount in advance before inspecting the item.</p>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-thick h-24 flex items-center justify-between px-6 z-50 border-t border-white/10 pb-4">
        <Button variant="outline" className="h-12 w-12 glass rounded-2xl border-none">
          <Heart className="w-6 h-6 text-muted-foreground" />
        </Button>
        <div className="flex gap-3 flex-1 ml-4">
          <Button className="flex-1 h-12 rounded-2xl gap-2 font-bold" variant="outline">
            <MessageCircle className="w-5 h-5" />
            Chat
          </Button>
          <Button className="flex-1 h-12 rounded-2xl gap-2 font-bold bg-green-600 hover:bg-green-700">
            <Phone className="w-5 h-5" />
            Call
          </Button>
        </div>
      </div>
    </div>
  );
}

function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
