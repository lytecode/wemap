import { Request, Response } from "express";
import UserService from "./user.service";

class UserController {
  async createUser(req: Request, res: Response) {
    const user = await UserService.create(req.body);
    if (user.error) return res.status(400).json({ error: user.error });
    res.status(201).json({ msg: "User created", data: user });
  }
}

export default new UserController();
