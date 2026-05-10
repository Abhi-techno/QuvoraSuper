'use server';
/**
 * @fileOverview Provides personalized home feed recommendations to users. (Stubbed)
 */

import { z } from 'genkit';

const PersonalizedHomeFeedRecommendationsInputSchema = z.object({
  userId: z.string(),
  browsingHistory: z.array(z.string()),
  expressedInterests: z.array(z.string()),
  currentLocation: z.string().optional(),
});
export type PersonalizedHomeFeedRecommendationsInput = z.infer<
  typeof PersonalizedHomeFeedRecommendationsInputSchema
>;

const PersonalizedHomeFeedRecommendationsOutputSchema = z.object({
  recommendedItems: z.array(
    z.object({
      itemId: z.string(),
      title: z.string(),
      description: z.string(),
      price: z.string(),
      imageUrl: z.string(),
      location: z.string(),
      category: z.string(),
    })
  ),
});
export type PersonalizedHomeFeedRecommendationsOutput = z.infer<
  typeof PersonalizedHomeFeedRecommendationsOutputSchema
>;

const FALLBACK_DATA: PersonalizedHomeFeedRecommendationsOutput = {
  recommendedItems: [
    {
      itemId: 'fallback-iphone',
      title: 'iPhone 15 Pro Max',
      description: 'Like new condition, 256GB, Natural Titanium.',
      price: '₹1,15,000',
      imageUrl: 'https://picsum.photos/seed/f1/400/400',
      location: 'Andheri, Mumbai',
      category: 'Mobiles'
    },
    {
      itemId: 'fallback-sofa',
      title: 'Modern L-Shaped Sofa',
      description: 'Premium grey fabric, 6 months old, no stains.',
      price: '₹28,500',
      imageUrl: 'https://picsum.photos/seed/f2/400/400',
      location: 'Powai, Mumbai',
      category: 'Furniture'
    }
  ]
};

export async function personalizedHomeFeedRecommendations(
  input: PersonalizedHomeFeedRecommendationsInput
): Promise<PersonalizedHomeFeedRecommendationsOutput> {
  // Static stub to prevent API errors
  return FALLBACK_DATA;
}
