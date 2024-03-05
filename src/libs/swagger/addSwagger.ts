import { Application } from "express";
import swaggerUi from 'swagger-ui-express';

export function addSwagger(app: Application) {
  const swaggerFile = require('./swagger.json');

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}