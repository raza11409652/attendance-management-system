import mongoose from "mongoose";
import { appConfig } from "../config/appConfig";

export const connectToMongoDatabase = (cb: (err?: string) => void) => {
  //   console.log(appConfig.mongoConnectionURL);
  if (!appConfig.mongoConnectionURL) cb("Mongo url not found");
  else {
    mongoose
      .connect(appConfig.mongoConnectionURL)
      .then(() => {
        // console.log(d);
        // Mongo connection success
        cb(undefined);
      })
      .catch((e) => {
        cb(e?.["message"] || "Error");
      });
    mongoose.Promise = global.Promise;
  }
};
