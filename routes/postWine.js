const express = require('express');
const pool = require('../db'); 
const router = express.Router();

/**
 * @swagger
 * /wines:
 *   post:
 *     summary: Adiciona um novo vinho
 *     tags: [Wines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Chardonnay
 *               description:
 *                 type: string
 *                 example: Branco
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 39.99
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               img_url:
 *                 type: string
 *                 example: zinfandel.jpg
 *     responses:
 *       201:
 *         description: Vinho criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                   format: float
 *                 quantity:
 *                   type: integer
 *                 img_url:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', async (req, res) => {
  const { name, description, price, quantity, img_url } = req.body;

  if (!name || !description || typeof price !== 'number' || typeof quantity !== 'number' || !img_url) {
    return res.status(400).send('Dados inválidos');
  }

  try {
    const result = await pool.query(
      'INSERT INTO wines (name, description, price, quantity, img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, quantity, img_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao inserir vinho:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
