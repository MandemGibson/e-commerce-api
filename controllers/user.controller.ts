import { NextFunction, Request, Response } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../services/user.service";

export const getAllUsersHandler = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await getAllUsers();
    if (!users) return res.status(404).json({ message: "No users found" });
    res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserByIdHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = await updateUser(id, userData);

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
