import { Redis } from "ioredis";

const redis = new Redis();

const result = await redis.keys("*");
console.log(result);

redis.quit();