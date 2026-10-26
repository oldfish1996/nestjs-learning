import mysql from "mysql2/promise";

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    database: "practice",
  });

  const [results, fields] = await connection.query("SELECT * FROM customers");
  console.log(results);
  console.log(fields.map((field) => field.name));
})();
