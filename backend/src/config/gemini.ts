export const geminiConfig = {
  // Use a supported Gemini model name by default; override with GEMINI_MODEL in .env.
  model: process.env.GEMINI_MODEL || 'models/gemini-3.1-pro-preview',
  timeoutMs: 60000,
};
