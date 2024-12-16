import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { User } from "../entity";
import { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../services/user.service";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "No token found - Login to continue" });

    const decoded = (await verifyToken(token)) as JwtPayload;
    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    const user = await getUserById(decoded.userId);
    if (!user)
      return res.status(401).json({ message: "Unauthorized - No user found" });

    req.user = user
    
    next()
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
