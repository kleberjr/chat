import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import { createSocketServer } from './createSocketServer';
import { createServer } from 'http';
import { registerRoutes } from './registerRoutes';

try {
  dotenvConfig();

  const app = express();
  const httpServer = createServer(app);
  
  registerRoutes(app);

  createSocketServer(httpServer);
  
  httpServer.listen(process.env.PORT, () => {
    console.log('🚀 Chat server is running at http://localhost:3000');
  });
} catch (e) {
  console.log(e);
}