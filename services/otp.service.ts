import { generateRandomOTP } from "../utils/random";
import { prisma } from "./prisma.service";
import crypto from "crypto";

export const createOtp = async (userId: string) => {
  try {
    const otp = generateRandomOTP();
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");

    await prisma.otp.create({
      data: {
        otp: hashedOtp,
        userId,
        expiresIn: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    return otp;
  } catch (error: any) {
    console.error("Error creating OTP: ", error.message);
  }
};

export const findOtp = async (otp: number) => {
  try {
    const hashedOtp = crypto
      .createHash("sha256")
      .update(otp.toString())
      .digest("hex");

    return await prisma.otp.findFirst({
      where: { otp: hashedOtp, valid: true, expiresIn: { gt: new Date() } },
    });
  } catch (error: any) {
    console.error("Error finding otp: ", error.message);
  }
};

export const invalidateOtp = async (id: string) => {
  try {
    await prisma.otp.update({
      where: { id },
      data: {
        valid: false,
      },
    });
  } catch (error: any) {
    console.error("Error invalidating otp: ", error.message);
  }
};
