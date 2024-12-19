import crypto from "crypto";

export const generateRandomOTP = (): number => {
  return crypto.randomInt(10000, 99999);
};

export const generateRandomResetToken = (): string => {
  return crypto.randomBytes(16).toString("hex");
};
