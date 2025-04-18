import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/getEnv";
import User, { IUser } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorize =
  (roles: Number[]) =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      {
        res
          .status(403)
          .json({ message: "Access denied: Insufficient permissions" });
        return;
      }
    }
    next();
  };
