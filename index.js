require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/swagger-config');
const winesRouter = require('./routes/wines');

const app = express();
const port = process.env.PORT_TO_LOCALHOST;

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/wines', winesRouter);

app.listen(port, () => {
  console.log(`API em execução na porta ${port}`); 
});
