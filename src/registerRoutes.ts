import { join } from "path";

export const registerRoutes = (app: any) => {
  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });
}