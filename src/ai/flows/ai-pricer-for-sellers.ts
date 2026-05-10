'use server';
/**
 * @fileOverview An AI agent that suggests a fair price range for an item. (Stubbed)
 */

import { z } from 'genkit';

const AiPricerForSellersInputSchema = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  condition: z.enum(['New', 'Like New', 'Good', 'Fair', 'For Parts']),
  location: z.string(),
  specificAttributes: z.record(z.string(), z.string()).optional(),
});
export type AiPricerForSellersInput = z.infer<typeof AiPricerForSellersInputSchema>;

const AiPricerForSellersOutputSchema = z.object({
  suggestedMinPrice: z.number(),
  suggestedMaxPrice: z.number(),
  currency: z.string().default('INR'),
  rationale: z.string(),
});
export type AiPricerForSellersOutput = z.infer<typeof AiPricerForSellersOutputSchema>;

export async function suggestPrice(
  input: AiPricerForSellersInput
): Promise<AiPricerForSellersOutput> {
  // Static stub to prevent API errors
  return {
    suggestedMinPrice: 10000,
    suggestedMaxPrice: 15000,
    currency: 'INR',
    rationale: 'Market average for similar used items in your area.'
  };
}
