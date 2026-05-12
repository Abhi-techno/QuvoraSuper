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
  HelpCircle,
  ShieldAlert
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
  const { id } = use(params);
  use(searchParams);

  const listing = {
    title: 'iPhone 15 Pro Max - 256GB (Natural Titanium)',
    price: '₹1,24,900',
    location: 'Bandra West, Mumbai',
    time: '2 hours ago',
    views: '154',
    saves: '23',
    condition: 'Like New',
    description: 'Selling my 3-month-old iPhone 15 Pro Max. Perfect condition, no scratches. Comes with box and original cable. Battery health is 100%. Under warranty until May 2025. Screen guard and premium case included.',
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
    <div className="flex flex-col gap-0 pb-36 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Gallery Section */}
      <div className="relative h-[48vh] w-full bg-black/5">
        <ScrollArea className="h-full w-full">
          <div className="flex h-full">
            {listing.images.map((img, i) => (
              <div key={i} className="relative min-w-full h-[48vh]">
                <Image src={img} alt="Product" fill sizes="100vw" className="object-cover" priority={i === 0} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        
        {/* Gallery Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 glass px-4 py-2 rounded-full border-none">
          {listing.images.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === 0 ? 'bg-primary w-4' : 'bg-white/40'}`} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button size="icon" variant="ghost" className="glass rounded-full border-none shadow-lg">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="glass rounded-full border-none shadow-lg">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 pt-8 flex flex-col gap-8 -mt-8 rounded-t-[3rem] bg-background relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
        <div>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary" className="glass bg-accent/10 text-accent border-none font-black text-[9px] tracking-widest px-3 py-1">NEGOTIABLE</Badge>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 tracking-tight"><Eye className="w-3.5 h-3.5" /> {listing.views}</span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 tracking-tight"><Heart className="w-3.5 h-3.5" /> {listing.saves}</span>
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none mb-2">{listing.price}</h1>
          <h2 className="text-xl font-bold leading-tight text-foreground/90">{listing.title}</h2>
          
          <div className="flex items-center gap-5 mt-4 text-[11px] font-bold text-muted-foreground/50 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{listing.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{listing.time}</span>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="glass-thick p-5 rounded-[2rem] flex items-start gap-4 border-none bg-primary/5">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-primary">AI Price Insight</h4>
            <p className="text-[13px] font-bold text-foreground/80 mt-1 leading-snug">Excellent Price. Similar iPhones sold for ₹1.22L - ₹1.35L in this area recently.</p>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-4 rounded-3xl border-none">
            <p className="text-[9px] text-muted-foreground/60 uppercase font-black tracking-widest">Condition</p>
            <p className="text-sm font-black mt-1">{listing.condition}</p>
          </div>
          <div className="glass p-4 rounded-3xl border-none">
            <p className="text-[9px] text-muted-foreground/60 uppercase font-black tracking-widest">Category</p>
            <p className="text-sm font-black mt-1">{listing.category}</p>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <h3 className="font-black text-[11px] uppercase tracking-widest text-muted-foreground">About this item</h3>
          <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed">
            {listing.description}
          </p>
          <Button variant="link" className="text-primary w-fit p-0 h-auto font-black text-xs uppercase tracking-widest mt-1">Full Specifications <ChevronRight className="w-3 h-3 ml-1" /></Button>
        </div>

        {/* Seller Card */}
        <div className="flex flex-col gap-4">
          <h3 className="font-black text-[11px] uppercase tracking-widest text-muted-foreground">Seller Profile</h3>
          <Card className="glass border-none rounded-[2rem] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-14 h-14 border-2 border-primary/10">
                    <AvatarImage src={listing.seller.avatar} />
                    <AvatarFallback>{listing.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-background" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-sm tracking-tight">{listing.seller.name}</h4>
                    {listing.seller.verified && <ShieldCheck className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <StarIcon size={11} />
                      <span className="text-[10px] font-black">{listing.seller.rating}</span>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/60">Joined {listing.seller.since}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/40" />
            </CardContent>
          </Card>
        </div>

        {/* Safety Banner */}
        <div className="glass p-5 rounded-[2rem] flex items-start gap-4 border-none bg-yellow-500/5 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
            <ShieldAlert className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-yellow-700">Safety Center</h4>
            <p className="text-[11px] font-bold text-yellow-800/70 mt-1 leading-relaxed">Always meet in public places. Do not pay any amount in advance before inspecting the item.</p>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-thick h-28 flex items-center justify-between px-6 z-50 border-t border-white/10 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <div className="flex gap-4 w-full">
          <Button className="flex-1 h-14 rounded-2xl gap-2 font-black text-sm uppercase tracking-widest glass border-none text-foreground/80 shadow-sm" variant="outline">
            <MessageCircle className="w-5 h-5" />
            Chat
          </Button>
          <Button className="flex-1 h-14 rounded-2xl gap-3 font-black text-sm uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Phone className="w-5 h-5" />
            Call Seller
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