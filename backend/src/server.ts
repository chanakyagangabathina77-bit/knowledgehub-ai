import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

const startServer = async () => {
  await connectDatabase();

  app.listen(env.PORT, () => {
    if (env.ENABLE_STARTUP_LOGS) {
      console.log(`🚀 Server Running On Port ${env.PORT}`);
    }
  });
};

startServer();
