import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Test API',
      version: '1.0.0',
      description: 'Test API with express',
    },
    servers: [
      {
        url: 'http://localhost:3532',
      },
    ],
  },
  apis: ['./src/routers/*.js'],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
