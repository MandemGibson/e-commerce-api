import { prisma } from "./prisma.service";

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  try {
    const cart = await prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const existingItem = await prisma.cartProduct.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      return await prisma.cartProduct.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    }

    return await prisma.cartProduct.create({
      data: { cartId: cart.id, productId, quantity },
    });
  } catch (error: any) {
    console.log("Error adding to cart: ", error.message);
  }
};

export const getCart = async () => {};

export const removeFromCart = async () => {};

export const clearCart = async () => {};
