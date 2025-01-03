import { Router } from "express";
import {
  cancelOrderHandler,
  getOrderByIdHandler,
  getOrdersByUserIdHandler,
  placeOrderHandler,
  updateOrderStatusHandler,
} from "../controllers/order.controller";
import { requireUser } from "../middlewares/protectedRoute";
import { isAdmin } from "../middlewares/role";

export const orderRouter = Router();

orderRouter.post("/place", requireUser, placeOrderHandler);
orderRouter.get("/", requireUser, getOrdersByUserIdHandler);
orderRouter.get("/:orderId", requireUser, getOrderByIdHandler);
orderRouter.patch("/:orderId/cancel", requireUser, cancelOrderHandler);
orderRouter.post("/:orderId", requireUser, isAdmin, updateOrderStatusHandler);
