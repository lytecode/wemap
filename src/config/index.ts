import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 8080,
  MONGO_URL: process.env.MONGO_URL || "127.0.0.1",
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  NOMINATIM_BASE_API: process.env.NOMINATIM_BASE_API,
  TIMER7_BASE_API: process.env.TIMER7_BASE_API,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
};

export default config;
