'use server';
/**
 * @fileOverview Provides AI-powered chat assistance, including quick reply suggestions and negotiation tips.
 *
 * - getChatAssistance - A function that fetches AI-suggested quick replies and negotiation tips.
 * - ChatAssistantInput - The input type for the getChatAssistance function.
 * - ChatAssistantOutput - The return type for the getChatAssistance function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatAssistantInputSchema = z.object({
  chatHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        message: z.string(),
      })
    )
    .describe('The recent history of the chat conversation.'),
  listingTitle: z.string().describe('The title of the listing being discussed.'),
  listingPrice: z.number().describe('The original price of the listing.'),
  currentOffer: z.number().optional().describe('The most recent offer made in the negotiation, if any.'),
  negotiationContext: z.string().optional().describe('Any specific context or goal for the negotiation.'),
});
export type ChatAssistantInput = z.infer<typeof ChatAssistantInputSchema>;

const ChatAssistantOutputSchema = z.object({
  quickReplies: z
    .array(z.string())
    .min(3)
    .max(5)
    .describe('A list of 3-5 AI-suggested short quick replies for the user to use.'),
  negotiationTip: z.string().describe('A concise, helpful tip for the current negotiation or chat context.'),
});
export type ChatAssistantOutput = z.infer<typeof ChatAssistantOutputSchema>;

export async function getChatAssistance(input: ChatAssistantInput): Promise<ChatAssistantOutput> {
  return chatAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatAssistantPrompt',
  input: { schema: ChatAssistantInputSchema },
  output: { schema: ChatAssistantOutputSchema },
  prompt: `You are an AI-powered chat assistant for a marketplace app. Your goal is to help users communicate efficiently and make informed decisions during chat and negotiation for a product listing.

Generate 3 to 5 concise quick replies that are relevant to the current chat history and the listing being discussed. Also, provide one helpful negotiation tip.

Chat History:
{{#each chatHistory}}
  {{this.role}}: {{this.message}}
{{/each}}

Listing Details:
Title: {{{listingTitle}}}
Price: {{{listingPrice}}}
{{#if currentOffer}}
Current Offer: {{{currentOffer}}}
{{/if}}
{{#if negotiationContext}}
Negotiation Context: {{{negotiationContext}}}
{{/if}}

Instructions:
1. Provide 3-5 short and relevant quick replies.
2. Provide one concise negotiation tip based on the context.

Examples of quick replies could be: "Is it still available?", "What's your best price?", "I'm interested!", "When can I pick it up?", "Thanks for the info!"
Examples of negotiation tips could be: "Always be polite and respectful.", "Suggest meeting in a public place for transactions.", "Don't be afraid to make a counter-offer.", "Highlight the benefits of a quick sale."`,
});

const chatAssistantFlow = ai.defineFlow(
  {
    name: 'chatAssistantFlow',
    inputSchema: ChatAssistantInputSchema,
    outputSchema: ChatAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
