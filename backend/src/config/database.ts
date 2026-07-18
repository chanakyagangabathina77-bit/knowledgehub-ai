import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    if (env.ENABLE_STARTUP_LOGS) {
      console.log('✅ MongoDB Connected Successfully');
    }
  } catch (error) {
    console.error('❌ MongoDB Connection Failed')
    console.error(error instanceof Error ? error.message : error)

    process.exit(1);
  }
};
