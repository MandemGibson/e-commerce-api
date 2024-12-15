import { NextFunction, Request, Response } from "express";
import { login } from "../services/auth.service";
import bcrypt from "bcrypt";

export const loginHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await login(email);
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ message: "Login successful", data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const signUpHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    //const salt
    const hashedPassword = await bcrypt.hash(password, 10);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
