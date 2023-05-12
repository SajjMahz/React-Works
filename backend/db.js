const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '98089',
    host: 'localhost',
    port: 5432,
    database: 'personal'
});

module.exports = pool;