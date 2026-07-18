import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';

(async () => {
  try {
    console.log('Using model:', process.env.GEMINI_MODEL || 'models/gemini-3.1-pro-preview');
    const client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    const response = await client.models.generateContent({
      model: process.env.GEMINI_MODEL || 'models/gemini-3.1-pro-preview',
      contents: 'What is the highest-level description of a knowledge hub AI project?',
      config: {
        temperature: 0.1,
        maxOutputTokens: 120,
      },
    });
    console.log('Response text:', response.text);
    console.log('Full response:', JSON.stringify(response, null, 2));
  } catch (error: any) {
    console.error('Gemini request failed');
    console.error('Error message:', error?.message ?? error);
    console.error('Error full:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    process.exit(1);
  }
})();
