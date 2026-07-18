import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT ?? 5000),
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
  ENABLE_HTTP_LOGS: process.env.ENABLE_HTTP_LOGS === 'true',
  ENABLE_STARTUP_LOGS: process.env.ENABLE_STARTUP_LOGS === 'true',
};
