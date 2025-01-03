import { Router } from "express";
import {
    cancelOrderHandler,
  getOrderByIdHandler,
  getOrdersByUserIdHandler,
  placeOrderHandler,
} from "../controllers/order.controller";
import { requireUser } from "../middlewares/protectedRoute";

export const orderRouter = Router();

orderRouter.post("/place", requireUser, placeOrderHandler);
orderRouter.get("/", requireUser, getOrdersByUserIdHandler);
orderRouter.get("/:orderId", requireUser, getOrderByIdHandler);
orderRouter.patch("/:orderId/cancel", requireUser, cancelOrderHandler);
