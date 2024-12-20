import { generateRandomResetToken } from "../utils/random";
import { prisma } from "./prisma.service";

export const createResetToken = async (userId: string) => {
  try {
    const token = generateRandomResetToken();

    return await prisma.resetToken.create({
      data: {
        token,
        userId,
        expiresIn: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
  } catch (error: any) {
    console.error("Error creating reset token: ", error.message);
  }
};

export const findResetToken = async (filter: any) => {
  try {
    return await prisma.resetToken.findFirst({
      where: { ...filter, valid: true, expiresIn: { gt: new Date() } },
    });
  } catch (error: any) {
    console.error("Error finding reset token: ", error.message);
  }
};

export const invalidateResetToken = async (id: string) => {
  try {
    await prisma.resetToken.update({
      where: {
        id,
      },
      data: {
        valid: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
