import { Request, Response, NextFunction } from "express";

const MESSAGE = "You are unauthorised to access this endpoint.";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: MESSAGE });
    }
    next();
  } catch (error) {
    next(error);
  }
};
