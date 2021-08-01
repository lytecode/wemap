import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader) {
    return res.status(401).json({
      auth: false,
      message: "No token provided",
    });
  }
  const token = bearerHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, config.JWT_SECRET as string);
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
