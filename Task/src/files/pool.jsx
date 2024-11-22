app.get('/api/orders', async (req, res) => {
    const { cursor, limit = 50, sort = 'createdAt', sortDirection = 'asc' } = req.query;
    const client = await pool.connect();
    try {
      let query = `
        SELECT * FROM orders
        WHERE (${sort} > $1 OR (${sort} = $1 AND id > $2))
        ORDER BY ${sort} ${sortDirection}, id ASC
        LIMIT $3
      `;
      const { rows } = await client.query(query, [cursor || new Date(), cursor || '', limit]);
      res.json({
        data: rows,
        nextCursor: rows.length ? rows[rows.length - 1][sort] : null,
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      client.release();
    }
  });
  export default pool;