import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./database/connect";
import routes from "./routes";

//Start database
db().catch((err) =>
  console.log("Ooops! Something went wrong with db connection")
);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//api routes
app.use("/api/v1", routes);

// Setup a default catch-all route
app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route!",
  });
  next();
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
