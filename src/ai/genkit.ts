
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // Default model for the entire app
  model: 'googleai/gemini-1.5-flash',
});
