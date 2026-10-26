import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "practice",
});

connection.query("SELECT * FROM customers", (err, results, fields) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Results:", results);
  console.log(
    "Fields:",
    fields.map((field) => field.name),
  );
});

connection.execute(
  "INSERT INTO customers (name) VALUES (?)",
  ["chen"],
  (err, results) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
  },
);

connection.execute(
  'UPDATE customers SET name="陈" where name="chen"',
  (err) => {
    console.log(err);
  },
);

connection.execute("DELETE  FROM customers where name=?", ["陈"], (err) => {
  console.log(err);
});
