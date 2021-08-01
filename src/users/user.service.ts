import argon2 from "argon2";
import config from "../config";
import jwt from "jsonwebtoken";
import { UserModel, IUser } from "./user.model";
import { validateEmail } from "../utils/emailValidation";

class UserService {
  async create(userDTO: IUser) {
    let { name, email, password } = userDTO;

    if (!validateEmail(email)) {
      return { error: "Invalid email address" };
    }
    //hash the password
    password = await argon2.hash(password);

    try {
      const createdUser = await UserModel.create({ name, email, password });
      return { id: createdUser._id, name: createdUser.name };
    } catch (error) {
      return { error: "User with email already exist" };
    }
  }

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

export default new UserService();
