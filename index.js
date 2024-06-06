const express = require('express');
const { Pool } = require('pg');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const port = 5050;

const app = express();

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'vinho_em_casa',
  port: 5433
});

// Verificar a conexão com o banco de dados
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados');
  release();
});

// Configurações do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Vinho em Casa',
      version: '1.0.0',
    },
  },
  apis: ['./index.js'], // Caminho para os arquivos que contêm anotações Swagger
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Wine:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Chardonnay
 *         tipo:
 *           type: string
 *           example: Branco
 *         preco:
 *           type: number
 *           format: float
 *           example: 39.99
 *         quantidade:
 *           type: integer
 *           example: 10
 */

/**
 * @swagger
 * tags:
 *   name: Wines
 *   description: API para gerenciamento de vinhos
 */

/**
 * @swagger
 * /wines:
 *   get:
 *     summary: Retorna a lista de vinhos
 *     tags: [Wines]
 *     responses:
 *       200:
 *         description: Lista de vinhos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wine'
 */
app.get('/wines', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM wines');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro na consulta SQL:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

app.listen(port, () => {
  console.log(`API em execução na porta ${port}`);
});
