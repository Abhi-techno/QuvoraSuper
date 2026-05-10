
import React from 'react';
import { Search, Mic, Camera, ChevronRight, TrendingUp, Sparkles, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import Link from 'next/link';
import { personalizedHomeFeedRecommendations } from '@/ai/flows/personalized-home-feed-recommendations';
import { getPlaceholderById } from '@/lib/placeholder-images';

export default async function Home() {
  // Centralized placeholder images
  const heroPromo = getPlaceholderById('hero-promo');
  const fallbackImages = [
    getPlaceholderById('fallback-iphone'),
    getPlaceholderById('fallback-sofa'),
    getPlaceholderById('fallback-bike'),
    getPlaceholderById('fallback-macbook'),
  ];

  // Gracefully handle AI recommendations failure with fallback data
  let recommendations;
  try {
    recommendations = await personalizedHomeFeedRecommendations({
      userId: 'user_123',
      browsingHistory: ['iphone 15', 'used car', 'mountain bike'],
      expressedInterests: ['Electronics', 'Cars'],
      currentLocation: 'Mumbai'
    });
  } catch (error: any) {
    // This catch is usually redundant as the flow itself handles fallbacks, 
    // but kept for absolute safety in server component rendering
    recommendations = {
      recommendedItems: [
        {
          itemId: 'fallback-1',
          title: fallbackImages[0].description,
          description: 'Like new condition, 256GB',
          price: '₹1,15,000',
          imageUrl: fallbackImages[0].imageUrl,
          location: 'Andheri, Mumbai',
          category: 'Mobiles'
        },
        {
          itemId: 'fallback-2',
          title: fallbackImages[1].description,
          description: 'Premium fabric, 6 months old',
          price: '₹28,500',
          imageUrl: fallbackImages[1].imageUrl,
          location: 'Powai, Mumbai',
          category: 'Furniture'
        },
        {
          itemId: 'fallback-3',
          title: fallbackImages[2].description,
          description: '2022 model, single owner',
          price: '₹1,85,000',
          imageUrl: fallbackImages[2].imageUrl,
          location: 'Bandra, Mumbai',
          category: 'Bikes'
        },
        {
          itemId: 'fallback-4',
          title: fallbackImages[3].description,
          description: '8GB/256GB, Space Grey',
          price: '₹72,000',
          imageUrl: fallbackImages[3].imageUrl,
          location: 'Colaba, Mumbai',
          category: 'Electronics'
        }
      ]
    };
  }

  const mainCategories = [
    { label: 'Mobiles', icon: '📱' },
    { label: 'Cars', icon: '🚗' },
    { label: 'Bikes', icon: '🏍️' },
    { label: 'Electronics', icon: '💻' },
    { label: 'Furniture', icon: '🛋️' },
    { label: 'Jobs', icon: '💼' },
    { label: 'Properties', icon: '🏠' },
    { label: 'Fashion', icon: '👕' },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 pt-4 animate-in fade-in duration-700">
      {/* Search Header */}
      <div className="relative flex items-center group">
        <Search className="absolute left-3 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input 
          className="pl-10 pr-20 h-12 glass rounded-2xl border-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary" 
          placeholder="Search for anything..." 
        />
        <div className="absolute right-2 flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
            <Mic className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
            <Camera className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold tracking-tight">Browse Categories</h2>
          <Link href="/browse" className="text-xs font-medium text-primary flex items-center">
            See All <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-3 pb-2">
            {mainCategories.map((cat) => (
              <Button key={cat.label} variant="outline" className="h-20 w-20 flex-col gap-1.5 glass border-none rounded-2xl transition-transform active:scale-95">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-[10px] font-semibold">{cat.label}</span>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </section>

      {/* Hero Banner Carousel (Static for MVP) */}
      <section className="relative h-44 rounded-3xl overflow-hidden shadow-lg border border-white/10 group">
        <Image 
          src={heroPromo.imageUrl} 
          alt={heroPromo.description} 
          width={800}
          height={400}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint={heroPromo.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
          <Badge className="w-fit mb-2 bg-accent hover:bg-accent/90">Featured</Badge>
          <h3 className="text-white text-xl font-bold leading-tight">Upgrade Your Style with<br/>Premium Watches</h3>
          <p className="text-white/70 text-xs mt-1">Starting from ₹4,999</p>
        </div>
      </section>

      {/* AI Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <h2 className="text-lg font-bold tracking-tight">AI Handpicked for You</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {recommendations.recommendedItems.slice(0, 4).map((item: any, idx: number) => (
            <Link key={item.itemId} href={`/listing/${item.itemId}`}>
              <Card className="glass border-none overflow-hidden transition-transform active:scale-95">
                <div className="relative aspect-square w-full">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    data-ai-hint={item.category}
                    priority={idx < 2}
                  />
                  <div className="absolute top-2 right-2 glass p-1.5 rounded-full">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-[10px] font-bold text-accent uppercase tracking-wider">{item.category}</p>
                  <h3 className="text-sm font-semibold truncate mt-0.5">{item.title}</h3>
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
      </section>

      {/* Trending Section */}
      <section className="pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold tracking-tight">Trending in Mumbai</h2>
          </div>
          <Link href="/trending" className="text-xs font-medium text-primary">View All</Link>
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-64 flex-shrink-0">
                <Card className="glass border-none overflow-hidden">
                  <div className="relative h-40">
                    <Image 
                      src={`https://picsum.photos/seed/trend${i}/400/300`} 
                      alt="Trend" 
                      fill 
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover" 
                      data-ai-hint="trending item" 
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col gap-1">
                    <h3 className="font-bold whitespace-normal line-clamp-2">2022 Toyota Fortuner Sigma 4 - Low Miles</h3>
                    <p className="text-xl font-bold text-primary">₹32,50,000</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">Powai, Mumbai</span>
                      <span className="text-[10px] glass px-2 py-0.5 rounded-full">2 hrs ago</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </section>
    </div>
  );
}
