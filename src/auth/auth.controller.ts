import { Request, Response } from "express";
import AuthService from "./auth.service";

class AuthenticationController {
  async userLogin(req: Request, res: Response) {
    const user = await AuthService.signInUser(req.body);
    if (user.error) return res.status(401).json({ error: user.error });
    if (user.internalError)
      return res.status(500).json({ error: user.internalError });

    return res
      .status(200)
      .json({ msg: "Successfully signed in", token: user.token });
  }
}

export default new AuthenticationController();
