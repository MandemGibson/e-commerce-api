import { Request, Response } from "express";
import { getOrdersByUserId, placeOrder } from "../services/order.service";

export const placeOrderHandler = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const newOrder = await placeOrder(user.id as string);
    if (!newOrder)
      return res.status(400).json({ message: "Failed to place order" });

    return res.status(201).json(newOrder);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getOrdersByUserIdHandler = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const orders = await getOrdersByUserId(user.id as string);
    if (!orders)
      return res.status(400).json({ message: "Failed to get orders" });

    return res.status(200).json(orders);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
