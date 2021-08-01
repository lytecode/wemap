import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }
  try {
    const decoded = await jwt.verify(
      token as string,
      config.JWT_SECRET as string
    );
    if (!decoded) {
      return res.status(401).json({
        auth: false,
        message: "Failed to authenticate token! Valid token required",
      });
    }
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      auth: false,
      message: "Failed to authenticate token! Valid token required",
    });
  }
};

export default auth;
