'use server';
/**
 * @fileOverview An AI agent that scans chat messages for suspicious content like phone numbers, emails, or external links.
 *
 * - chatSafetyScanner - A function that handles the chat safety scanning process.
 * - ChatSafetyScannerInput - The input type for the chatSafetyScanner function.
 * - ChatSafetyScannerOutput - The return type for the chatSafetyScanner function.
 */

import {ai, googleAIPlugin} from '@/ai/genkit';
import {z} from 'genkit';

const ChatSafetyScannerInputSchema = z.object({
  message: z.string().describe('The chat message to be scanned for suspicious content.'),
});
export type ChatSafetyScannerInput = z.infer<typeof ChatSafetyScannerInputSchema>;

const ChatSafetyScannerOutputSchema = z.object({
  hasSuspiciousContent: z
    .boolean()
    .describe('True if any suspicious content (phone numbers, email addresses, or external links) was detected.'),
  detectedItems: z
    .array(
      z.object({
        type: z
          .enum(['phone_number', 'email_address', 'external_link'])
          .describe('The type of suspicious content detected.'),
        value: z.string().describe('The detected suspicious content itself (e.g., the phone number, email, or URL).'),
      })
    )
    .describe('A list of detected suspicious items.'),
});
export type ChatSafetyScannerOutput = z.infer<typeof ChatSafetyScannerOutputSchema>;

export async function chatSafetyScanner(input: ChatSafetyScannerInput): Promise<ChatSafetyScannerOutput> {
  return chatSafetyScannerFlow(input);
}

const chatSafetyScannerPrompt = ai.definePrompt({
  name: 'chatSafetyScannerPrompt',
  model: googleAIPlugin.model('gemini-1.5-flash'),
  input: {schema: ChatSafetyScannerInputSchema},
  output: {schema: ChatSafetyScannerOutputSchema},
  prompt: `You are an AI assistant designed to detect suspicious content in chat messages. Your task is to identify phone numbers, email addresses, and external links.
For each piece of suspicious content found, output its type and value in the specified JSON format.
If no suspicious content is found, return an empty 'detectedItems' array and set 'hasSuspiciousContent' to 'false'.

Chat Message: {{{message}}}`,
});

const chatSafetyScannerFlow = ai.defineFlow(
  {
    name: 'chatSafetyScannerFlow',
    inputSchema: ChatSafetyScannerInputSchema,
    outputSchema: ChatSafetyScannerOutputSchema,
  },
  async input => {
    const {output} = await chatSafetyScannerPrompt(input);
    // Ensure hasSuspiciousContent reflects whether any items were detected
    if (output) {
      output.hasSuspiciousContent = output.detectedItems.length > 0;
    }
    return output!;
  }
);
