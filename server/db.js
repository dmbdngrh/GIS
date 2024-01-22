const Pool = require("pg").Pool;

const pool = new Pool({
    user: "[USER]",
    password: "[PASSWORD]",
    host: "localhost",
    port: "[PORT]",
    database: "[DATABASE]"
})

module.exports = pool;
