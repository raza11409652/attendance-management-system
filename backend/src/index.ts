import express from "express";
import { appConfig } from "./config/appConfig";
import appRoutes from "./routes";
import { connectToMongoDatabase } from "./database/mongo";
import cors from "cors";
import errorHandler from "./errors/errorHandler";
const app = express();
// !!TODO
// origin allowed need to be configured
app.use(cors());
app.use(express.json());
// configure routes
app.use(appRoutes);

// Global Error response handler
// need to be added into express app

app.listen(appConfig.port, () => {
  connectToMongoDatabase((s) => {
    // console.log(s);
    if (s !== undefined) process.exit(1);
    else console.log("database connected successfully");
  });
  console.log(`server is up and running  at ${appConfig.port}`);
});
// app.use(errorHandler);
app.use(errorHandler);
