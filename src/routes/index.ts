import { Router } from "express";
import UserController from "../users/user.controller";
import AuthController from "../auth/auth.controller";
import AddressController from "../address/address.controller";

const app = Router();

app.get("/", (req, res) => {
  res.json("Welcome to Weather Api!");
});

app.post("/auth/login", AuthController.userLogin);
app.post("/users", UserController.createUser);
app.post("/addresses/verify", AddressController.getAddress);
app.post("/addresses/weather", AddressController.checkWeather);

export default app;
