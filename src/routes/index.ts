import { Router } from "express";
import UserController from "../users/user.controller";
import AuthController from "../auth/auth.controller";

const app = Router();

app.get("/", (req, res) => {
  res.json("Welcome to Weather Api!");
});

app.post("/auth/login", AuthController.userLogin);
app.post("/users", UserController.createUser);

export default app;
