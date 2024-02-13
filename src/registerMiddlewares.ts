import { authenticationMiddleware } from "./middlewares/authenticationMiddleware";
import { testMiddleware } from "./middlewares/testMiddleware";

export const registerMiddlewares = (app: any) => {
  app.use(authenticationMiddleware);
  app.use(testMiddleware);
}