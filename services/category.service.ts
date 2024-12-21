import { Category } from "../entity";
import { prisma } from "./prisma.service";

export const createCategory = async (payload: Category) => {
  try {
    return await prisma.category.create({
      data: payload,
    });
  } catch (error: any) {
    console.error("Error creating category: ", error.message);
  }
};

export const createManyCategories = async (categories: Category[]) => {
  try {
    return await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });
  } catch (error: any) {
    console.error("Error creating many categories: ", error.message);
  }
};

export const getAllCategory = async () => {
  try {
    return await prisma.category.findMany();
  } catch (error: any) {
    console.error("Error getting all categories: ", error.message);
  }
};

export const getCategoryById = async (id: string) => {
  try {
    return await prisma.category.findUnique({
      where: { id },
    });
  } catch (error: any) {
    console.error("Error getting category by id: ", error.message);
  }
};

export const updateCategory = async (id: string, payload: Category) => {
  try {
    return await prisma.category.update({
      where: { id },
      data: payload,
    });
  } catch (error: any) {
    console.error("Error getting category by id: ", error.message);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({
      where: { id },
    });
  } catch (error: any) {
    console.error("Error deleting category by id: ", error.message);
  }
};
