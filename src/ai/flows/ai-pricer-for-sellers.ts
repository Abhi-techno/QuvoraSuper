'use server';
/**
 * @fileOverview An AI agent that suggests a fair price range for an item based on its details.
 *
 * - suggestPrice - A function that handles the price suggestion process for sellers.
 * - AiPricerForSellersInput - The input type for the suggestPrice function.
 * - AiPricerForSellersOutput - The return type for the suggestPrice function.
 */

import { ai, googleAIPlugin } from '@/ai/genkit';
import { z } from 'genkit';

const AiPricerForSellersInputSchema = z.object({
  category: z
    .string()
    .describe("The main category of the item (e.g., 'Mobiles', 'Cars', 'Electronics')."),
  title: z.string().describe('The title of the listing.'),
  description: z.string().describe('A detailed description of the item.'),
  condition: z
    .enum(['New', 'Like New', 'Good', 'Fair', 'For Parts'])
    .describe('The condition of the item.'),
  location: z
    .string()
    .describe('The general location where the item is being sold (e.g., city, region).'),
  specificAttributes: z
    .record(z.string(), z.string())
    .optional()
    .describe('An optional JSON object containing category-specific attributes (e.g., {brand: "Apple", model: "iPhone 13 Pro Max"}).'),
});
export type AiPricerForSellersInput = z.infer<typeof AiPricerForSellersInputSchema>;

const AiPricerForSellersOutputSchema = z.object({
  suggestedMinPrice: z.number().describe('The minimum suggested price for the item.'),
  suggestedMaxPrice: z.number().describe('The maximum suggested price for the item.'),
  currency: z.string().default('INR').describe('The currency code for the suggested price, defaults to INR.'),
  rationale: z
    .string()
    .describe('A brief explanation or rationale behind the suggested price range.'),
});
export type AiPricerForSellersOutput = z.infer<typeof AiPricerForSellersOutputSchema>;

export async function suggestPrice(
  input: AiPricerForSellersInput
): Promise<AiPricerForSellersOutput> {
  return aiPricerForSellersFlow(input);
}

const priceSuggesterPrompt = ai.definePrompt({
  name: 'priceSuggesterPrompt',
  model: googleAIPlugin.model('gemini-1.5-flash'),
  input: { schema: AiPricerForSellersInputSchema },
  output: { schema: AiPricerForSellersOutputSchema },
  prompt: `You are an expert market analyst for a classifieds platform. Your task is to provide a fair and competitive price range for an item based on its details, simulating current market conditions for similar active listings.

Consider the following information about the item:

Category: {{{category}}}
Title: {{{title}}}
Description: {{{description}}}
Condition: {{{condition}}}
Location: {{{location}}}
{{#if specificAttributes}}
Specific Attributes:
{{#each specificAttributes}}
  - {{{@key}}}: {{{this}}}
{{/each}}
{{/if}}

Based on these details, what is a fair and competitive price range (min and max) in Indian Rupees (INR)? Also, provide a brief rationale for your suggestion. The suggested prices should be realistic for a second-hand market in India.
`,
});

const aiPricerForSellersFlow = ai.defineFlow(
  {
    name: 'aiPricerForSellersFlow',
    inputSchema: AiPricerForSellersInputSchema,
    outputSchema: AiPricerForSellersOutputSchema,
  },
  async (input) => {
    const { output } = await priceSuggesterPrompt(input);
    return output!;
  }
);
