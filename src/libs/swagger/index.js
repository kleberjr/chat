const swaggerAutogen = require('swagger-autogen')();

const outputFilePath = './swagger.json';
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
  tags: [
      {
          "name": "Base",
          "description": "Endpoints"
      },
      {
          "name": "Auth",
          "description": "Endpoints"
      },
  ],
  securityDefinitions: {
      api_key: {
          type: "apiKey",
          name: "api_key",
          in: "header"
      },
      petstore_auth: {
          type: "oauth2",
          authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
          flow: "implicit",
          scopes: {
              read_pets: "read your pets",
              write_pets: "modify pets in your account"
          }
      }
  },
  definitions: {
    Login: {
      $email: "example@domain.com",
      $password: "secret"
    }
  }
}

swaggerAutogen(outputFilePath, endpointFilesPath, doc);