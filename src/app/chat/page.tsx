
"use client"

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, CheckCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function ChatListPage() {
  const chats = [
    {
      id: '1',
      name: 'Rahul Sharma',
      avatar: 'https://picsum.photos/seed/rahul/100/100',
      lastMessage: 'Is the iPhone still available for ₹45,000?',
      time: '10:30 AM',
      unread: 2,
      listingImage: 'https://picsum.photos/seed/ip15/100/100',
      status: 'online'
    },
    {
      id: '2',
      name: 'Priya Patel',
      avatar: 'https://picsum.photos/seed/priya/100/100',
      lastMessage: 'I can come for pickup today at 6 PM.',
      time: 'Yesterday',
      unread: 0,
      listingImage: 'https://picsum.photos/seed/sofa1/100/100',
      status: 'offline'
    },
    {
      id: '3',
      name: 'Quvora Support',
      avatar: 'https://picsum.photos/seed/qbot/100/100',
      lastMessage: 'Your ad for "Royal Enfield" has been approved.',
      time: 'Mon',
      unread: 0,
      listingImage: null,
      status: 'verified'
    }
  ];

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-20 animate-in fade-in duration-500">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
        <Input 
          className="pl-10 h-12 glass rounded-2xl border-none" 
          placeholder="Search messages..." 
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full glass rounded-xl">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          <TabsTrigger value="selling" className="flex-1">Selling</TabsTrigger>
          <TabsTrigger value="buying" className="flex-1">Buying</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2 mt-2">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <Card className="glass border-none p-4 hover:bg-white/5 transition-colors flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.status === 'online' && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm">{chat.name}</h3>
                  <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-primary">
                  <CheckCheck className="w-3 h-3" />
                  <span>Delivered</span>
                </div>
              </div>
              {chat.unread > 0 ? (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {chat.unread}
                </div>
              ) : (
                chat.listingImage && (
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                    <img src={chat.listingImage} alt="Listing" className="w-full h-full object-cover" />
                  </div>
                )
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
