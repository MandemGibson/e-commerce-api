import { Product } from "../entity";
import { prisma } from "./prisma.service";

export const addProduct = async (payload: Product) => {
  try {
    return await prisma.product.create({
      data: payload,
    });
  } catch (error: any) {
    console.error("Error adding product: ", error.message);
  }
};

export const getAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (error: any) {
    console.error("Error getting all products: ", error.message);
  }
};

export const getProductById = async (id: string) => {
  try {
    return await prisma.product.findUnique({
      where: { id },
    });
  } catch (error: any) {
    console.error("Error getting product by id: ", error.message);
  }
};

export const updateProduct = async (id: string, payload: Product) => {
  try {
    return await prisma.product.update({
      where: { id },
      data: payload,
    });
  } catch (error: any) {
    console.error("Error updating product: ", error.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error: any) {
    console.error("Error deleting product: ", error.message);
  }
};

export const deleteAllProducts = async () => {
  try {
    await prisma.product.deleteMany()
  } catch (error: any) {
    console.error("Error deleting all products: ", error.message);
  }
};
