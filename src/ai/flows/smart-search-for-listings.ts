'use server';
/**
 * @fileOverview A Genkit flow for intelligent search, understanding natural language
 * queries and correcting typos to extract relevant search parameters.
 *
 * - smartSearchForListings - A function that processes a user's search query.
 * - SmartSearchForListingsInput - The input type for the smartSearchForListings function.
 * - SmartSearchForListingsOutput - The return type for the smartSearchForListings function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SmartSearchForListingsInputSchema = z.object({
  searchQuery: z.string().describe('The user\'s natural language search query, which may contain typos.'),
});
export type SmartSearchForListingsInput = z.infer<typeof SmartSearchForListingsInputSchema>;

const SmartSearchForListingsOutputSchema = z.object({
  correctedQuery: z.string().describe('The user\'s search query with typos corrected.'),
  keywords: z.array(z.string()).describe('A list of primary keywords extracted from the search query.'),
  inferredCategory: z.string().optional().describe('An optional category inferred from the search query, if applicable.'),
});
export type SmartSearchForListingsOutput = z.infer<typeof SmartSearchForListingsOutputSchema>;

export async function smartSearchForListings(input: SmartSearchForListingsInput): Promise<SmartSearchForListingsOutput> {
  return smartSearchForListingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartSearchPrompt',
  input: { schema: SmartSearchForListingsInputSchema },
  output: { schema: SmartSearchForListingsOutputSchema },
  prompt: `You are an intelligent search assistant for a marketplace application. Your task is to process a user's natural language search query. Understand their intent, correct any typos, and extract relevant keywords and an inferred category if obvious.

Input query: "{{{searchQuery}}}"

Based on the input query, provide the corrected query, a list of primary keywords that can be used for searching product listings, and an inferred category if one is strongly suggested. Prioritize fixing typos and ensuring the keywords are accurate for searching.

Example:
Input: "iphne 13 for sael"
Output: {"correctedQuery": "iphone 13 for sale", "keywords": ["iphone", "13"], "inferredCategory": "Mobiles & Tablets"}

Input: "used books about history"
Output: {"correctedQuery": "used books about history", "keywords": ["used", "books", "history"], "inferredCategory": "Books & Hobbies"}

Input: "red dress size medium"
Output: {"correctedQuery": "red dress size medium", "keywords": ["red", "dress", "medium"], "inferredCategory": "Fashion & Clothing"}

Input: "vintage car part"
Output: {"correctedQuery": "vintage car part", "keywords": ["vintage", "car", "part"], "inferredCategory": "Cars"}

Input: "apartmet for rent in Mumbai"
Output: {"correctedQuery": "apartment for rent in Mumbai", "keywords": ["apartment", "rent", "Mumbai"], "inferredCategory": "Real Estate"}
`,
});

const smartSearchForListingsFlow = ai.defineFlow(
  {
    name: 'smartSearchForListingsFlow',
    inputSchema: SmartSearchForListingsInputSchema,
    outputSchema: SmartSearchForListingsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
