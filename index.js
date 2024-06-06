const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/swagger-config');
const winesRouter = require('./routes/wines');
const open = require('open');

const app = express();
const port = 5050;

// Configurações do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Usar as rotas
app.use('/wines', winesRouter);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API em execução na porta ${port}`);
  
  // Open Swagger documentation in the browser
  open(`http://localhost:${port}/api-docs`);
});
