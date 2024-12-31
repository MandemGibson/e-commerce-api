import { Request, Response } from "express";
import {
  addToCart,
  getCartByUserId,
  removeFromCart,
  clearCart,
} from "../services/cart.service";

export const addToCartHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user = req.user;
    if (!user.id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "User ID, Product ID, and quantity are required" });
    }

    const cartProduct = await addToCart(user.id, productId, quantity);
    res
      .status(201)
      .json({ message: "Product added to cart", data: cartProduct });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await getCartByUserId(id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const totalPrice = cart.cartProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const totalQuantity = cart.cartProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );

    res.status(200).json({ ...cart, totalPrice, totalQuantity });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCartHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { cartProductId } = req.params;
    if (!cartProductId) {
      return res.status(400).json({ message: "Cart Product ID is required" });
    }

    const deletedCartProduct = await removeFromCart(cartProductId);
    if (!deletedCartProduct) {
      return res.status(404).json({ message: "Cart Product not found" });
    }
    
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCartHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    await clearCart(userId);
    res.status(200).json({ message: "Cart cleared" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
