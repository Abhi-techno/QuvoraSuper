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

const personalizedHomeFeedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedHomeFeedRecommendationsPrompt',
  input: {schema: PersonalizedHomeFeedRecommendationsInputSchema},
  output: {schema: PersonalizedHomeFeedRecommendationsOutputSchema},
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
  prompt: `You are an expert marketplace recommendation engine for Quvora, an Indian marketplace platform.
Your task is to generate 5-10 distinct item recommendations for the user based on their browsing history, expressed interests, and current location.
Focus on typical marketplace categories found in India such as Mobiles, Cars, Bikes, Electronics, Furniture, Jobs, Fashion, Real Estate, etc.
Invent plausible item details including title, description, price (using Indian Rupee symbol ₹), a placeholder image URL, location, and category.

CRITICAL INSTRUCTION FOR IMAGES:
For the "imageUrl" field, you MUST ONLY use URLs from picsum.photos. 
Use this exact format: https://picsum.photos/seed/<unique_slug>/400/400
Replace <unique_slug> with a unique, descriptive slug for each item (e.g., iphone15pro, vintagebike, modernsofa).

STRICT OUTPUT INSTRUCTIONS:
- Return response in strict JSON format.
- Do not use markdown (no \`\`\`json blocks).
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
  return personalizedHomeFeedRecommendationsFlow(input);
}

const personalizedHomeFeedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedHomeFeedRecommendationsFlow',
    inputSchema: PersonalizedHomeFeedRecommendationsInputSchema,
    outputSchema: PersonalizedHomeFeedRecommendationsOutputSchema,
  },
  async (input) => {
    // 1. Check for API key presence
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '';
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.log('AI Recommendations: No valid API Key found. Using fallback.');
      return FALLBACK_DATA;
    }

    try {
      // 2. Safe call - avoid direct destructuring to catch null/undefined results
      const result = await personalizedHomeFeedRecommendationsPrompt(input);
      
      if (!result) {
        console.warn('AI Recommendations: Prompt returned null result.');
        return FALLBACK_DATA;
      }

      if (!result.output) {
        console.warn('AI Recommendations: Prompt result missing output property.');
        return FALLBACK_DATA;
      }

      return result.output;
    } catch (e: any) {
      // 3. Improved error logging
      const errorMessage = e?.message || (typeof e === 'string' ? e : 'Unknown Error');
      const isConfigError = errorMessage.includes('API key') || errorMessage.includes('404') || errorMessage.includes('403');
      
      if (isConfigError) {
        console.log('AI Recommendations: Service configuration error. Using fallback.');
      } else {
        console.error('AI Recommendation Flow Error:', {
          message: errorMessage,
          stack: e?.stack,
          raw: JSON.stringify(e, null, 2)
        });
      }
      
      // 4. Guaranteed fallback return
      return FALLBACK_DATA;
    }
  }
);
