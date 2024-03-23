import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import { createServer } from 'http';
import { registerRoutes } from './routes';
import { addSwagger } from './libs/swagger';
import { inboundMiddlewares, outboundMiddlewares } from './middlewares';
import { startSocketServer } from './socket';

try {
  dotenvConfig();

  const app = express();
  const httpServer = createServer(app);
 
  app.use('/css', express.static(__dirname + '/frontend/css'));
  app.use('/js', express.static(__dirname + '/frontend/js'));

  app.use(...inboundMiddlewares(app))
  registerRoutes(app);
  app.use(...outboundMiddlewares(app))

  addSwagger(app);

  startSocketServer(httpServer);
  
  httpServer.listen(process.env.PORT, () => {
    console.log('🚀 Chat server is running at http://localhost:3000');
  });
} catch (e) {
  console.log(e);
}