import { Request, Response } from "express";
import { placeOrder } from "../services/order.service";

export const placeOrderHandler = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (!user.id)
      return res.status(400).json({ message: "User ID is missing" });
    const newOrder = await placeOrder(user.id);
    if (!newOrder)
      return res.status(400).json({ message: "Failed to place order" });

    return res.status(201).json(newOrder);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
