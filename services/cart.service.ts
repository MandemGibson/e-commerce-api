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

export const getCartByUserId = async (userId: string) => {
  try {
    return await prisma.cart.findUnique({
      where: { userId },
      include: { cartProducts: { include: { product: true } } },
    });
  } catch (error: any) {
    console.log("Error getting cart: ", error.message);
  }
};

export const removeFromCart = async (cartProductId: string) => {
  try {
    return await prisma.cartProduct.delete({
      where: { id: cartProductId },
    });
  } catch (error: any) {
    console.log("Error removing from cart: ", error.message);
  }
};

export const clearCart = async () => {};
