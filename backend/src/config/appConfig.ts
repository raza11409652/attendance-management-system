import * as dotenv from "dotenv";
dotenv.config();
export const appConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
  mongoConnectionURL: process.env.MONGO_DB_CONNECTION_URL,
};
