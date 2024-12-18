import { Router } from "express";
import {
  getMeHandler,
  loginHandler,
  logoutHandler,
  signUpHandler,
} from "../controllers/auth.controller";
import { signUpLimiter } from "../middlewares/limiter";
import { requireUser } from "../middlewares/protectedRoute";

export const authRouter = Router();

authRouter.post("/login", loginHandler);
authRouter.post("/signup", signUpLimiter, signUpHandler);
authRouter.get("/me", requireUser, getMeHandler);
authRouter.post("/logout", logoutHandler);
