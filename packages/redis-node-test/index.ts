import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (err) => {
  console.log("Redis client error:", err);
});

await client.connect();

await client.hSet("chen1", "1", 1);
await client.hSet("chen1", "2", 2);
await client.hSet("chen1", "3", 3);

const value = await client.keys("*");
console.log(value);

const hGet = await client.hGetAll("chen1");
console.log(hGet);

await client.quit();
