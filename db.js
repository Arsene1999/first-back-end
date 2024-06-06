const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'vinho_em_casa',
  port: 5433
});

module.exports = pool;
