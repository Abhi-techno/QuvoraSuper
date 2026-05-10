
"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Camera, ImagePlus, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { suggestPrice } from '@/ai/flows/ai-pricer-for-sellers';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';

export default function PostAdPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    condition: 'Like New' as any,
    price: '',
    location: 'Mumbai, Maharashtra'
  });
  const [priceInsight, setPriceInsight] = useState<any>(null);

  const handlePricer = async () => {
    if (!formData.title || !formData.description) return;
    setLoading(true);
    try {
      const result = await suggestPrice({
        category: formData.category || 'Electronics',
        title: formData.title,
        description: formData.description,
        condition: formData.condition,
        location: formData.location
      });
      setPriceInsight(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 2) handlePricer();
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex flex-col gap-6 px-4 pt-4 pb-24 animate-in slide-in-from-right-4 duration-500">
      <Progress value={(step / 5) * 100} className="h-2 glass" />
      
      {step === 1 && (
        <div className="flex flex-col gap-6 animate-in fade-in">
          <h2 className="text-xl font-bold">What are you selling?</h2>
          <div className="grid grid-cols-2 gap-4">
            {['Mobiles', 'Cars', 'Bikes', 'Electronics', 'Furniture', 'Jobs'].map((cat) => (
              <Button 
                key={cat} 
                variant={formData.category === cat ? 'default' : 'outline'}
                className="h-24 glass border-none flex-col gap-2 rounded-2xl"
                onClick={() => {
                  setFormData({...formData, category: cat});
                  nextStep();
                }}
              >
                <span className="text-2xl">
                  {cat === 'Mobiles' ? '📱' : cat === 'Cars' ? '🚗' : cat === 'Bikes' ? '🏍️' : cat === 'Electronics' ? '💻' : cat === 'Furniture' ? '🛋️' : '💼'}
                </span>
                <span className="text-sm font-bold">{cat}</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-6 animate-in fade-in">
          <h2 className="text-xl font-bold">Ad Details</h2>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                className="glass border-none h-12" 
                placeholder="e.g. iPhone 15 Pro Max Natural Titanium"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                className="glass border-none min-h-[120px]" 
                placeholder="Tell buyers about your item's features, usage, and any wear and tear..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <Button variant="link" className="text-primary text-xs p-0 gap-1 h-auto">
                <Sparkles className="w-3 h-3" />
                AI Assist Write
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <div className="flex flex-wrap gap-2">
                {['New', 'Like New', 'Good', 'Fair'].map((c) => (
                  <Button 
                    key={c}
                    variant={formData.condition === c ? 'default' : 'outline'}
                    className="h-9 glass border-none text-xs rounded-full px-4"
                    onClick={() => setFormData({...formData, condition: c as any})}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-6 animate-in fade-in">
          <h2 className="text-xl font-bold">Photos & Media</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square glass rounded-2xl flex flex-col items-center justify-center gap-1 border-2 border-dashed border-primary/20 text-primary">
              <Camera className="w-8 h-8" />
              <span className="text-[10px] font-bold">Add Cover</span>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square glass rounded-2xl flex items-center justify-center text-muted-foreground/30">
                <ImagePlus className="w-8 h-8" />
              </div>
            ))}
          </div>
          <div className="glass p-4 rounded-2xl border-l-4 border-accent bg-accent/5">
            <p className="text-xs font-medium">Tip: Items with 3+ clear photos sell 5x faster!</p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-6 animate-in fade-in">
          <h2 className="text-xl font-bold">Price & Location</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Price</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold">₹</span>
                <Input 
                  className="pl-10 h-16 glass border-none text-2xl font-bold" 
                  placeholder="0"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>
            </div>

            {loading ? (
              <div className="glass p-5 rounded-2xl animate-pulse flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 bg-primary/20 rounded" />
                  <div className="h-2 w-full bg-primary/10 rounded" />
                </div>
              </div>
            ) : priceInsight && (
              <Card className="glass-thick border-none bg-primary/5">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="w-5 h-5" />
                    <h4 className="font-bold">AI Price Suggestion</h4>
                  </div>
                  <p className="text-lg font-bold">₹{priceInsight.suggestedMinPrice.toLocaleString()} - ₹{priceInsight.suggestedMaxPrice.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{priceInsight.rationale}</p>
                  <Button variant="link" className="text-primary p-0 h-auto text-xs font-bold w-fit" onClick={() => setFormData({...formData, price: priceInsight.suggestedMinPrice.toString()})}>Apply Suggested Price</Button>
                </CardContent>
              </Card>
            )}

            <div className="space-y-2">
              <Label>Location</Label>
              <div className="glass h-14 rounded-2xl px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{formData.location}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-primary text-xs font-bold">Change</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-col items-center gap-6 py-10 animate-in zoom-in-95 duration-500">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Ready to Publish!</h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">Review your ad and post it for free to reach thousands of buyers.</p>
          </div>
          
          <div className="w-full glass p-5 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-xs text-muted-foreground">Ad Category</span>
              <span className="text-xs font-bold">{formData.category}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-xs text-muted-foreground">Title</span>
              <span className="text-xs font-bold truncate max-w-[200px]">{formData.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Price</span>
              <span className="text-xs font-bold">₹{formData.price}</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav Controls */}
      {step > 1 && (
        <div className="fixed bottom-24 left-4 right-4 flex gap-4 z-40">
          {step < 5 ? (
            <>
              <Button variant="ghost" className="flex-1 glass h-14 rounded-2xl font-bold" onClick={prevStep}>Back</Button>
              <Button className="flex-[2] h-14 rounded-2xl font-bold text-lg bg-primary" onClick={nextStep}>Continue</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="flex-1 glass h-14 rounded-2xl font-bold" onClick={() => setStep(1)}>Edit</Button>
              <Button className="flex-[2] h-14 rounded-2xl font-bold text-lg bg-primary shadow-lg shadow-primary/20" onClick={() => router.push('/')}>Publish Ad</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
