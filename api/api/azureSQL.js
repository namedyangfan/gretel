const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DB_NAME,
  authentication: {
    type: 'default',
  },
  options: {
    encrypt: true,
  },
};

function runQuery(query) {
  return sql.connect(config).then((pool) => {
    return pool.query(query);
  });
}

module.exports = runQuery;
