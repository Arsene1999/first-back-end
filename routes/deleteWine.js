const express = require('express');
const pool = require('../db'); 
const router = express.Router();

/**
 * @swagger
 * /wines/{id}:
 *   delete:
 *     summary: Deleta um vinho pelo ID
 *     tags: [Wines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do vinho
 *     responses:
 *       200:
 *         description: Vinho deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vinho deletado com sucesso
 *       404:
 *         description: Vinho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM wines WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Vinho não encontrado');
    }
    res.status(200).json({ message: 'Vinho deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar vinho:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

module.exports = router;
