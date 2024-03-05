const swaggerAutogen = require('swagger-autogen')();

const outputFilePath = './swagger.json';
// TODO: generate this array dinamically
const endpointFilesPath = [
  '../../routes/auth.router.ts', 
  '../../routes/base.router.ts'
];

const doc = {
  info: {
    version: "1.0.0",
    title: "Its Just a Chat - API",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {},
  // TODO: generate this definitions dynamically
  definitions: {
    Login: {
      $email: {
        type: "string"
      },
      $password: "secret"
    }
  }
}

swaggerAutogen(outputFilePath, endpointFilesPath, doc);