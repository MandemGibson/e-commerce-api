import { Router } from "express";
import { placeOrderHandler } from "../controllers/order.controller";
import { requireUser } from "../middlewares/protectedRoute";

export const orderRouter = Router();

orderRouter.post("/place", requireUser, placeOrderHandler);
