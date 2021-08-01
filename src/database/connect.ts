import { connect } from "mongoose";
import config from "../config";

const url = config.MONGO_URL || "localhost";
export async function db(): Promise<void> {
  // Connect to MongoDB
  await connect(`mongodb://${url}:27017/wefox`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("db connected");
}
