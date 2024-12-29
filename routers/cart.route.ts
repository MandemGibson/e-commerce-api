import { Router } from "express";
import { requireUser } from "../middlewares/protectedRoute";
import {
  addToCartHandler,
  clearCartHandler,
  getCartHandler,
  removeFromCartHandler,
} from "../controllers/cart.controller";
export const cartRouter = Router();

cartRouter.post("/", requireUser, addToCartHandler);
cartRouter
  .route("/:userId")
  .get(requireUser, getCartHandler)
  .delete(requireUser, clearCartHandler);
cartRouter.put("/:cartProductId", requireUser, removeFromCartHandler);
