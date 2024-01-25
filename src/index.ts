import express from 'express';

try {
  const app = express();

  // register any middlewares, routes and stuff

  const server = app.listen(process.env.PORT);

  // create socket server

  console.log('🚀 Chat server is running at http://localhost:3000');
} catch (e) {
  console.log(e);
}