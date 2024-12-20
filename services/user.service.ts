import { User } from "../entity";
import { prisma } from "./prisma.service";

export const addUser = async (payload: User) => {
  try {
    return prisma.user.create({
      data: payload,
    });
  } catch (error: any) {
    console.error("Error adding user: ", error);
  }
};

export const getAllUsers = async () => {
  try {
    return prisma.user.findMany();
  } catch (error: any) {
    console.error("Error getting all users: ", error);
  }
};

export const getUserById = async (id: string) => {
  try {
    return prisma.user.findUnique({
      where: { id },
    });
  } catch (error: any) {
    console.error("Error getting user by id: ", error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return prisma.user.findUnique({
      where: { email },
    });
  } catch (error: any) {
    console.error("Error getting user by email: ", error);
  }
};

export const updateUser = async (id: string, payload: User) => {
  try {
    return prisma.user.update({
      where: { id },
      data: payload,
    });
  } catch (error: any) {
    console.error("Error updating user: ", error);
  }
};

export const updatePassword = async (id: string, password: string) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { password },
    });
  } catch (error: any) {
    console.error("Error updating user's password: ", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    return prisma.user.delete({
      where: { id },
    });
  } catch (error: any) {
    console.error("Error updating user: ", error);
  }
};
