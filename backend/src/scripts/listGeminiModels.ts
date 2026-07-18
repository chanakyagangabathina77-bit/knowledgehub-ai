import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';

(async () => {
  try {
    const client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    const result = await client.models.list();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('LIST ERROR', error);
    process.exit(1);
  }
})();
