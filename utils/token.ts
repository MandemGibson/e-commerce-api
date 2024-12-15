import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = async (userId: string, res: Response) => {
  try {
    const token = await jwt.sign(userId, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error: any) {
    console.error("Error generating token: ", error.message);
  }
};
