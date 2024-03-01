import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import { createSocketServer } from './createSocketServer';
import { createServer } from 'http';
import { inboundMiddlewares, outboundMiddlewares } from './middlewares';
import { registerRoutes } from './routes';

try {
  dotenvConfig();

  const app = express();
  const httpServer = createServer(app);
 
  app.use('/css', express.static(__dirname + '/pages/css'));
  app.use('/js', express.static(__dirname + '/pages/js'));
  
  app.use(...inboundMiddlewares(app))
  registerRoutes(app);
  app.use(...outboundMiddlewares(app))
  
  createSocketServer(httpServer);
  
  httpServer.listen(process.env.PORT, () => {
    console.log('🚀 Chat server is running at http://localhost:3000');
  });
} catch (e) {
  console.log(e);
}