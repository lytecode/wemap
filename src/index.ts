import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { db } from "./database/connect";
import routes from "./routes";
import config from "./config";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

//Start database
db().catch((err) =>
  console.log("Ooops! Something went wrong with db connection")
);

const app = express();
const PORT = config.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//setup swagger docs
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Address verification and Weather Service",
      description: "API for weather updates and address verification",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [{ url: `http://localhost:${config.PORT}` }],
  },
  apis: ["./src/routes/index.ts"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//api routes
app.use("/api/v1", routes);

// Setup a default catch-all route
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: "Invalid route!",
  });
  next();
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));

export default app;
