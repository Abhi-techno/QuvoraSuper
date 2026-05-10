import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Global Genkit configuration for the Quvora application.
 * We export the plugin instance so flows can use its model() helper for robust model resolution.
 */
export const googleAIPlugin = googleAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
});

export const ai = genkit({
  plugins: [googleAIPlugin],
});
