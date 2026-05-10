
"use client"

import React from 'react';
import { Card } from '@/components/ui/card';
import { Bell, MessageCircle, Tag, Info, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      title: 'New message from Rahul',
      description: 'Is the iPhone still available for ₹45,000?',
      time: '10m ago',
      type: 'message',
      unread: true
    },
    {
      id: '2',
      title: 'Price drop alert!',
      description: 'An item in your saved list has dropped in price.',
      time: '2h ago',
      type: 'price',
      unread: true
    },
    {
      id: '3',
      title: 'Ad Approved',
      description: 'Your ad for "Royal Enfield" is now live.',
      time: 'Yesterday',
      type: 'system',
      unread: false
    }
  ];

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <Card key={n.id} className={`glass border-none p-4 flex items-start gap-4 transition-colors ${n.unread ? 'bg-primary/5 ring-1 ring-primary/20' : ''}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              n.type === 'message' ? 'bg-blue-500/10 text-blue-500' : 
              n.type === 'price' ? 'bg-orange-500/10 text-orange-500' : 'bg-gray-500/10 text-gray-500'
            }`}>
              {n.type === 'message' ? <MessageCircle className="w-5 h-5" /> : 
               n.type === 'price' ? <Tag className="w-5 h-5" /> : <Info className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm truncate pr-2">{n.title}</h3>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.description}</p>
            </div>
            {n.unread && <Badge className="w-2 h-2 rounded-full p-0 bg-primary" />}
          </Card>
        ))}
      </div>
    </div>
  );
}
