import { Router } from "express";
import {
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { requireUser } from "../middlewares/protectedRoute";

export const userRouter = Router();

userRouter.get("/", requireUser, getAllUsersHandler);
userRouter
  .route("/:id")
  .get(requireUser, getUserByIdHandler)
  .put(requireUser, updateUserHandler)
  .delete(requireUser, deleteUserHandler);
