import { Router } from "express";
import { loginHandler, signUpHandler } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/signup", signUpHandler);
