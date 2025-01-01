import { getCartByUserId } from "./cart.service";
import { prisma } from "./prisma.service";

export const placeOrder = async (userId: string) => {
  try {
    const cart = await getCartByUserId(userId);
    if (!cart || cart.cartProducts.length === 0)
      throw new Error("Cart is empty");

    const totalPrice = cart.cartProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const totalQuantity = cart.cartProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        price: totalPrice,
        quantity: totalQuantity,
        orderProducts: {
          create: cart.cartProducts.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
        status: "PENDING",
      },
    });

    await prisma.cartProduct.deleteMany({
      where: { cartId: cart.id },
    });

    return order;
  } catch (error: any) {
    console.error("Error placing order: ", error.message);
  }
};

export const getOrdersByUserId = async (userId: string) => {
  try {
    return await prisma.order.findMany({
      where: { userId },
      include: { orderProducts: true },
    });
  } catch (error: any) {
    console.error("Error getting orders: ", error.message);
  }
};
