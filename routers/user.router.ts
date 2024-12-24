import { Router } from "express";
import {
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "../controllers/user.controller";
import { requireUser } from "../middlewares/protectedRoute";
import { isAdmin } from "../middlewares/role";

export const userRouter = Router();

userRouter.get("/", requireUser, isAdmin, getAllUsersHandler);
userRouter
  .route("/:id")
  .get(requireUser, isAdmin, getUserByIdHandler)
  .put(requireUser, isAdmin, updateUserHandler)
  .delete(requireUser, isAdmin, deleteUserHandler);
