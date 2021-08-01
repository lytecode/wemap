import Redis from "ioredis";
import config from "../config";

const client = new Redis({
  port: config.REDIS_PORT as number,
  host: config.REDIS_HOST,
});

client.on("connect", () => console.log("Redis client connected"));
client.on("ready", () => console.log("Redis client connected and ready..."));
client.on("error", (err) => console.log({ error: err.message }));
client.on("end", () => console.log("Client connected from redis"));
client.on("SIGINT", () => client.quit());

export default client;
