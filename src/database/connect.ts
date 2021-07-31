import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL || "localhost";
export async function db(): Promise<void> {
  // Connect to MongoDB
  await connect(`mongodb://${url}:27017/wefox`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log("db connected");
}
