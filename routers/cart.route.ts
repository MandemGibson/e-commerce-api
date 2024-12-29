import { Router } from "express";
import { requireUser } from "../middlewares/protectedRoute";
import { addToCartHandler } from "../controllers/cart.controller";
export const cartRouter = Router();

cartRouter.route("/").post(requireUser, addToCartHandler);
