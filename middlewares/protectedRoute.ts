import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { JwtPayload } from "jsonwebtoken";
import { getUserById } from "../services/user.service";
import { getAdminById } from "../services/admin.service";
import { Admin, User } from "../entity";

declare global {
  namespace Express {
    interface Request {
      user: User | Admin;
    }
  }
}

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "No token found - Login to continue" });

    const decoded = (await verifyToken(token)) as JwtPayload;
    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    const user =
      (await getUserById(decoded.userId)) ||
      (await getAdminById(decoded.userId));
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    req.user = user;

    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
