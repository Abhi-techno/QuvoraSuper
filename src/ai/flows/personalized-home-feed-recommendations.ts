'use server';
/**
 * @fileOverview Provides personalized home feed recommendations to users.
 *
 * - personalizedHomeFeedRecommendations - A function that generates a list of recommended items for a user.
 * - PersonalizedHomeFeedRecommendationsInput - The input type for the recommendation function.
 * - PersonalizedHomeFeedRecommendationsOutput - The return type for the recommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedHomeFeedRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user requesting recommendations.'),
  browsingHistory: z
    .array(z.string())
    .describe('A list of titles or descriptions of items the user has recently viewed.'),
  expressedInterests: z
    .array(z.string())
    .describe('A list of categories or keywords the user has expressed interest in.'),
  currentLocation: z
    .string()
    .optional()
    .describe(
      "The user's current city or region, if available, to prioritize local recommendations."
    ),
});
export type PersonalizedHomeFeedRecommendationsInput = z.infer<
  typeof PersonalizedHomeFeedRecommendationsInputSchema
>;

const PersonalizedHomeFeedRecommendationsOutputSchema = z.object({
  recommendedItems: z
    .array(
      z.object({
        itemId: z.string().describe('Unique identifier for the recommended item.'),
        title: z.string().describe('The title of the recommended item.'),
        description: z
          .string()
          .describe('A brief description of the recommended item.'),
        price: z.string().describe('The price of the recommended item, e.g., ₹15,000.'),
        imageUrl: z
          .string()
          .describe(
            'A placeholder URL for the item image. ALWAYS use the format: https://picsum.photos/seed/<unique_slug>/400/400'
          ),
        location: z
          .string()
          .describe('The location where the item is available, e.g., "Mumbai, Maharashtra".'),
        category: z.string().describe('The category of the recommended item, e.g., "Mobiles".'),
      })
    )
    .describe('A list of recommended items.'),
});
export type PersonalizedHomeFeedRecommendationsOutput = z.infer<
  typeof PersonalizedHomeFeedRecommendationsOutputSchema
>;

const prompt = ai.definePrompt({
  name: 'personalizedHomeFeedRecommendationsPrompt',
  input: {schema: PersonalizedHomeFeedRecommendationsInputSchema},
  output: {schema: PersonalizedHomeFeedRecommendationsOutputSchema},
  // CORRECT: model is a top-level property, NOT inside config/generationConfig
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an expert marketplace recommendation engine for Quvora, an Indian marketplace platform.
Your task is to generate 5-10 distinct item recommendations for the user based on their browsing history, expressed interests, and current location.
Focus on typical marketplace categories found in India such as Mobiles, Cars, Bikes, Electronics, Furniture, Jobs, Fashion, Real Estate, etc.
Invent plausible item details including title, description, price (using Indian Rupee symbol ₹), a placeholder image URL, location, and category.

CRITICAL INSTRUCTION FOR IMAGES:
For the "imageUrl" field, you MUST ONLY use URLs from picsum.photos. 
Use this exact format: https://picsum.photos/seed/<unique_slug>/400/400

STRICT OUTPUT INSTRUCTIONS:
- Return response in strict JSON format.
- Do not use markdown backticks (no \`\`\`json).
- Ensure all fields match the requested schema exactly.

User ID: {{{userId}}}
Browsing History:
{{#each browsingHistory}}
- {{{this}}}
{{/each}}

Expressed Interests:
{{#each expressedInterests}}
- {{{this}}}
{{/each}}

Current Location: {{{currentLocation}}}`,
});

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
    },
    {
      itemId: 'fallback-bike',
      title: 'Royal Enfield Classic 350',
      description: '2022 model, single owner, matte black.',
      price: '₹1,85,000',
      imageUrl: 'https://picsum.photos/seed/f3/400/400',
      location: 'Bandra, Mumbai',
      category: 'Bikes'
    },
    {
      itemId: 'fallback-macbook',
      title: 'MacBook Air M2',
      description: '8GB/256GB, Space Grey, battery 98%.',
      price: '₹72,000',
      imageUrl: 'https://picsum.photos/seed/f4/400/400',
      location: 'Colaba, Mumbai',
      category: 'Electronics'
    }
  ]
};

export async function personalizedHomeFeedRecommendations(
  input: PersonalizedHomeFeedRecommendationsInput
): Promise<PersonalizedHomeFeedRecommendationsOutput> {
  try {
    // Attempt the AI prompt call with safe access
    const result = await prompt(input);
    
    // Check for output explicitly
    if (!result || !result.output) {
      console.warn('AI Recommendations: Prompt returned no valid output. Using fallback data.');
      return FALLBACK_DATA;
    }

    return result.output;
  } catch (e: any) {
    // Log detailed error information for debugging while ensuring the UI doesn't crash
    const errorMessage = e?.message || (typeof e === 'string' ? e : 'Unknown error during AI generation');
    console.error('AI FLOW ERROR:', errorMessage);
    
    // Specific check for the generationConfig/model error we just fixed
    if (errorMessage.includes('model') && errorMessage.includes('generation_config')) {
      console.error('CRITICAL: AI call failed because model name was inside generation_config. This should be fixed now.');
    }
    
    // Always return fallback data to maintain a working UI
    return FALLBACK_DATA;
  }
}
