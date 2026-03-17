const sql = require("mssql");

const config = {
  user: "Sonu",
  password: "yourpassword",
  server: "localhost\\SQLEXPRESS",
  database: "chatapp",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect
  .then(() => console.log("Connected to SQL Server"))
  .catch(err => console.log("Connection error:", err));

module.exports = {
  sql,
  pool,
  poolConnect
};