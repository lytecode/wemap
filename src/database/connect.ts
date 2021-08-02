import { connect } from "mongoose";
import config from "../config";

const url = config.MONGO_URL || "localhost";

export async function db(env: string): Promise<void> {
  let useDB = "wefox";
  //setup test db
  if (env === "test") {
    useDB = "test";
  }
  // Connect to MongoDB
  await connect(`mongodb://${url}:27017/${useDB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("db connected");
}
