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
            'A placeholder URL for the item image. ALWAYS use the format: https://picsum.photos/seed/<random_string>/400/400'
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

export async function personalizedHomeFeedRecommendations(
  input: PersonalizedHomeFeedRecommendationsInput
): Promise<PersonalizedHomeFeedRecommendationsOutput> {
  return personalizedHomeFeedRecommendationsFlow(input);
}

const personalizedHomeFeedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedHomeFeedRecommendationsPrompt',
  input: {schema: PersonalizedHomeFeedRecommendationsInputSchema},
  output: {schema: PersonalizedHomeFeedRecommendationsOutputSchema},
  prompt: `You are an expert marketplace recommendation engine for Quvora, an Indian marketplace platform.
Your task is to generate 5-10 distinct item recommendations for the user based on their browsing history, expressed interests, and current location.
Focus on typical marketplace categories found in India such as Mobiles, Cars, Bikes, Electronics, Furniture, Jobs, Fashion, Real Estate, etc.
Invent plausible item details including title, description, price (using Indian Rupee symbol ₹), a placeholder image URL, location, and category.

CRITICAL INSTRUCTION FOR IMAGES:
For the "imageUrl" field, you MUST ONLY use URLs from picsum.photos. 
Use this exact format: https://picsum.photos/seed/{{itemId}}/400/400
Replace {{itemId}} with a unique, descriptive slug for each item (e.g., iphone15pro, vintagebike, modernsofa).

User ID: {{{userId}}}
Browsing History:
{{#each browsingHistory}}
- {{{this}}}
{{/each}}

Expressed Interests:
{{#each expressedInterests}}
- {{{this}}}
{{/each}}

Current Location: {{{currentLocation}}}

Generate recommendations in the specified JSON format. Ensure all fields are populated with realistic-sounding data.`,
});

const personalizedHomeFeedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedHomeFeedRecommendationsFlow',
    inputSchema: PersonalizedHomeFeedRecommendationsInputSchema,
    outputSchema: PersonalizedHomeFeedRecommendationsOutputSchema,
  },
  async (input) => {
    const {output} = await personalizedHomeFeedRecommendationsPrompt(input);
    if (!output) {
      throw new Error('No recommendations were generated.');
    }
    return output;
  }
);
