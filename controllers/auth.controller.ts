import { Request, Response } from "express";
import { login, signUp } from "../services/auth.service";
import { hashPassword, validatePassword } from "../utils/password";
import { getUserByEmail, updatePassword } from "../services/user.service";
import { generateToken } from "../utils/token";
import { createOtp, findOtp, invalidateOtp } from "../services/otp.service";
import {
  createResetToken,
  findResetToken,
  invalidateResetToken,
} from "../services/resetToken.service";
import { getAdmin } from "../services/admin.service";

export const loginHandler = async (
  req: Request,
  res: Response
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
  res: Response
): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const existingUser =
      (await getUserByEmail(email)) ?? (await getAdmin(email));
      
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
  res: Response
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

export const forgotPasswordHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Provide email" });

    const user = await getUserByEmail(email);
    if (!user)
      return res
        .status(404)
        .json({ message: "No user associated with provided email" });

    const otp = await createOtp(user.id);
    res.status(200).json({ message: `OTP sent to ${email}`, data: otp });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyOtpHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ message: "Provide OTP" });

    const foundOtp = await findOtp(otp);
    if (!foundOtp) return res.status(404).json({ message: "Invalid OTP" });

    let resetToken = await findResetToken({ userId: foundOtp.userId });
    if (!resetToken) resetToken = await createResetToken(foundOtp.userId);

    await invalidateOtp(foundOtp.id);

    res
      .status(200)
      .json({ message: "OTP verified successfully", data: resetToken?.token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPasswordHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    if (!token || !newPassword || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    const resetToken = await findResetToken({ token });
    if (!resetToken)
      return res.status(404).json({ message: "Invalid reset token" });

    if (confirmPassword !== newPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await hashPassword(newPassword);

    const user = await updatePassword(
      resetToken.userId,
      hashedPassword as string
    );
    await invalidateResetToken(resetToken.id);

    if (!user)
      return res.status(404).json({ message: "Record to update not found" });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
