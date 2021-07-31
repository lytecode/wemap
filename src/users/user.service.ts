import argon2 from "argon2";
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
}

export default new UserService();
