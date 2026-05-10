
"use client"

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Settings, 
  Heart, 
  Package, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Wallet,
  Star,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const stats = [
    { label: 'Active Ads', value: '3', icon: Package, color: 'text-primary' },
    { label: 'Views', value: '1.2k', icon: Clock, color: 'text-accent' },
    { label: 'Saved', value: '12', icon: Heart, color: 'text-pink-500' },
    { label: 'Rating', value: '4.8', icon: Star, color: 'text-yellow-500' },
  ];

  const menuItems = [
    { label: 'My Ads', icon: Package, href: '/my-ads' },
    { label: 'Saved Items', icon: Heart, href: '/saved' },
    { label: 'Transactions & Payments', icon: Wallet, href: '/wallet' },
    { label: 'Quvora Safety Center', icon: ShieldCheck, href: '/safety' },
    { label: 'Settings', icon: Settings, href: '/settings' },
    { label: 'Help & Support', icon: HelpCircle, href: '/support' },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 pb-24 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <Avatar className="w-20 h-20 border-4 border-primary/20 ring-4 ring-white/5">
            <AvatarImage src="https://picsum.photos/seed/user/150/150" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 glass p-1 rounded-full text-primary">
            <CheckCircle2 className="w-5 h-5 fill-primary text-white" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">Arjun Varma</h2>
          <p className="text-xs text-muted-foreground">Member since May 2024</p>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="outline" className="h-8 glass rounded-full text-[10px] font-bold">Edit Profile</Button>
            <Button size="sm" className="h-8 rounded-full text-[10px] font-bold">Verify Identity</Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass border-none">
            <CardContent className="p-3 flex flex-col items-center gap-1">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-sm font-bold">{stat.value}</span>
              <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-bold">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Boost Banner */}
      <section className="relative h-24 rounded-2xl overflow-hidden glass border-none flex items-center px-6">
        <div className="z-10 flex flex-col gap-1">
          <h3 className="font-bold text-sm">Boost your ads!</h3>
          <p className="text-[10px] text-muted-foreground">Get 10x more responses today.</p>
          <Button size="sm" className="w-fit h-7 text-[10px] mt-1 bg-accent hover:bg-accent/90">Upgrade to Plus</Button>
        </div>
        <div className="absolute right-4 bottom-0 w-24 h-24 opacity-20">
          <TrendingUpIcon />
        </div>
      </section>

      {/* Menu List */}
      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <Card className="glass border-none p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Card>
          </Link>
        ))}
      </div>

      <Button variant="ghost" className="text-destructive w-fit gap-2 font-bold mt-4">
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </div>
  );
}

function TrendingUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
