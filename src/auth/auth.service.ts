import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/user.model";
import config from "../config";

class AuthenticationService {
  async signInUser(loginDTO: {
    email: string;
    password: string;
  }): Promise<{ token?: string; error?: string; internalError?: string }> {
    const { email, password } = loginDTO;
    const user = await UserModel.findOne({ email });

    if (!user) return { error: "Incorrect email or password" };
    //compare password
    try {
      if (!(await argon2.verify(user.password, password))) {
        return { error: "Incorrect email or password" };
      }
    } catch (err) {
      return { internalError: "Cannot login at the moment, please try again" };
    }

    //password matched
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, `${config.JWT_SECRET}`, {
      expiresIn: config.TOKEN_EXPIRES_IN,
    });

    return { token };
  }
}

export default new AuthenticationService();
