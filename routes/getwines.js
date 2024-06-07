const express = require('express');
const pool = require('../db'); 
const router = express.Router();

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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Chardonnay
 *                   description:
 *                     type: string
 *                     example: Branco
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 39.99
 *                   quantity:
 *                     type: integer
 *                     example: 10
 *                   img_url:
 *                     type: string
 *                     example: zinfandel.jpg
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM wines');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro na consulta SQL:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
