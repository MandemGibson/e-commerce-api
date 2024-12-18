import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = async (
  userId: string,
  res: Response,
  rememberMe: boolean
) => {
  try {
    const token = await jwt.sign(
      { userId },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "2d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 2 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error: any) {
    console.error("Error generating token: ", error.message);
  }
};

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  } catch (error: any) {
    console.error("Error verifying token: ", error.message);
  }
};
