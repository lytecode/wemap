import { Router, Request, Response } from "express";
import UserController from "../users/user.controller";
import AuthController from "../auth/auth.controller";
import AddressController from "../address/address.controller";
import auth from "../middleware/authentication";

const app = Router();

app.get("/", (req: Request, res: Response) => {
  res.json("Welcome to Weather Api!");
});

app.post("/auth/login", AuthController.userLogin);
app.post("/users", UserController.createUser);
app.post("/addresses/verify", AddressController.getAddress);

//secured routes
app.use(auth);
app.post("/addresses/weather", AddressController.checkWeather);

export default app;
