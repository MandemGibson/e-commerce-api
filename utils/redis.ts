import { config } from "dotenv";
import { Redis } from "ioredis";

config();

//Redis connection
const redisClient = new Redis({
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

redisClient.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export async function confirmRedisConnection() {
  try {
    const res = await redisClient.ping();
    console.log("Redis connection confirmed: ", res);
  } catch (error: any) {
    console.error("Redis connection failed: ", error);
  }
}
