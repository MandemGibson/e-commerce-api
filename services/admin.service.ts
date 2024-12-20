import { Admin } from "../entity";
import { hashPassword } from "../utils/password";
import { prisma } from "./prisma.service";

export const getAdmins = async () => {
  try {
    return await prisma.admin.findMany();
  } catch (error: any) {
    console.error("Error getting admins: ", error.message);
  }
};

export const getAdmin = async (email: string) => {
  try {
    return prisma.admin.findUnique({ where: { email } });
  } catch (error: any) {
    console.error("Error getting admin: ", error.message);
  }
};

export const createAdmin = async () => {
  try {
    const existingAdmin = await getAdmin("admin@shop.com");
    if (existingAdmin) return console.log("Admin already exists");

    const password = "admin";
    const hashedPassword = await hashPassword(password);

    const admin = await prisma.admin.create({
      data: {
        email: "admin@shop.com",
        password: hashedPassword as string,
      },
    });

    console.log(`Created admin with id: ${admin.id} and email:${admin.email}`);
  } catch (error: any) {
    console.error("Error creating admin: ", error.message);
  }
};

export const updateAdmin = async (payload: Admin, email: string) => {
  try {
    return await prisma.admin.update({
      where: { email },
      data: payload,
    });
  } catch (error: any) {
    console.error("Error updating admin: ", error.message);
  }
};

export const deleteAdmin = async (email: string) => {
  try {
    return await prisma.admin.delete({
      where: { email },
    });
  } catch (error: any) {
    console.error("Error deleting admin: ", error.message);
  }
};
