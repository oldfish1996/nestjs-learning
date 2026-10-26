import mysql from "mysql2/promise";

// 连接池测试

(async () => {
  const pool = await mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    database: "practice",
    waitForConnections: true, // 是否等待连接
    connectionLimit: 10, // 连接池最大连接数
    maxIdle: 10, // 连接池最大空闲连接数
    idleTimeout: 60000, // 空闲连接超时时间
    queueLimit: 0, // 可以排队的请求数量，超过这个数量就直接返回报错说没有连接了,设置为 0 就是排队没有上限。
    enableKeepAlive: true, // 是否启用长连接
    keepAliveInitialDelay: 0, // 长连接初始延迟时间
  });

  // const [results] = await pool.query("SELECT * FROM customers");
  // console.log(results);

  const connection = await pool.getConnection();
  const [results] = await connection.query("SELECT * FROM orders");
  console.log(results);
  // connection.release();
})();
