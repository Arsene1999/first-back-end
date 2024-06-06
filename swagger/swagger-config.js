const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Vinho em Casa',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos que contêm anotações Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;
