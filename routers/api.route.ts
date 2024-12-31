import { Router } from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.router";
import { categoryRouter } from "./category.route";
import { productRouter } from "./product.route";
import { cartRouter } from "./cart.route";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/cart", cartRouter);
