const express = require('express');
const pool = require('../db'); // Import the database connection
const router = express.Router();

/**
 * @swagger
 * /wines/{id}:
 *   patch:
 *     summary: Atualiza o preço e/ou quantidade de um vinho
 *     tags: [Wines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do vinho
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 42.99
 *               quantity:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Vinho atualizado com sucesso
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
 *       404:
 *         description: Vinho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { price, quantity } = req.body;

  console.log('Request Params:', req.params);
  console.log('Request Body:', req.body);
  console.log('Request price:', req.price);

  if (price === undefined && quantity === undefined) {
    return res.status(400).send('Nenhum dado fornecido para atualização');
  }

  let query = 'UPDATE wines SET';
  const values = [];
  let index = 1;

  if (price !== undefined) {
    if (typeof price !== 'number') {
      return res.status(400).send('Preço inválido');
    }
    query += ` price = $${index},`;
    values.push(price);
    index++;
  }

  if (quantity !== undefined) {
    if (typeof quantity !== 'number') {
      return res.status(400).send('Quantidade inválida');
    }
    query += ` quantity = $${index},`;
    values.push(quantity);
    index++;
  }

  query = query.slice(0, -1) + ` WHERE id = $${index} RETURNING *`;
  values.push(id);

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).send('Vinho não encontrado');
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar vinho:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
