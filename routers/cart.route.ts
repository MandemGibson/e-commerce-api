import { Router } from "express";
import { requireUser } from "../middlewares/protectedRoute";
import {
  addToCartHandler,
  clearCartHandler,
  getCartHandler,
  removeFromCartHandler,
} from "../controllers/cart.controller";

export const cartRouter = Router();

cartRouter
  .route("/")
  .post(requireUser, addToCartHandler)
  .get(requireUser, getCartHandler);

cartRouter.delete("/:userId", requireUser, clearCartHandler);

cartRouter.put("/:cartProductId", requireUser, removeFromCartHandler);
