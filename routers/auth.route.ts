import { Router } from "express";
import {
  forgotPasswordHandler,
  getMeHandler,
  loginHandler,
  logoutHandler,
  resetPasswordHandler,
  signUpHandler,
  verifyOtpHandler,
} from "../controllers/auth.controller";
import {
  loginLimiter,
  otpRequestLimiter,
  signUpLimiter,
} from "../middlewares/limiter";
import { requireUser } from "../middlewares/protectedRoute";

export const authRouter = Router();

authRouter.post("/login", loginLimiter, loginHandler);
authRouter.post("/signup", signUpLimiter, signUpHandler);
authRouter.get("/me", requireUser, getMeHandler);
authRouter.post("/logout", logoutHandler);
authRouter.post("/request-otp", otpRequestLimiter, forgotPasswordHandler);
authRouter.post("/verify-otp", verifyOtpHandler);
authRouter.post("/reset-password", resetPasswordHandler);
