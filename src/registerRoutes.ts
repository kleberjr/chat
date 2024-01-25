export const registerRoutes = (app: any) => {
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  });
}