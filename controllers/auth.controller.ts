import { NextFunction, Request, Response } from "express";
import { login, signUp } from "../services/auth.service";
import { hashPassword, validatePassword } from "../utils/password";
import { getUserByEmail } from "../services/user.service";
import { generateToken } from "../utils/token";

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

    const isPasswordCorrect = await validatePassword(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid password" });

    await generateToken(user.id, res, false);

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
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await hashPassword(password);
    const user = await signUp({ email, password: hashedPassword as string });

    res.status(201).json({ message: "Sign up successful", data: user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMeHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<any> => {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found. Login to continue" });
    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
