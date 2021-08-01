import { Request, Response } from "express";
import UserService from "./user.service";

class UserController {
  async createUser(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    if (user.error) return res.status(400).json({ error: user.error });
    res.status(201).json({ msg: "User created", data: user });
  }

  async userLogin(req: Request, res: Response) {
    const user = await UserService.signInUser(req.body);
    if (user.error) return res.status(401).json({ error: user.error });
    if (user.internalError)
      return res.status(500).json({ error: user.internalError });

    return res
      .status(200)
      .json({ msg: "Successfully signed in", token: user.token });
  }
}

export default new UserController();
