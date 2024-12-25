import { Router } from "express";
import {
  addProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import { requireUser } from "../middlewares/protectedRoute";
import { isAdmin } from "../middlewares/role";
export const productRouter = Router();

productRouter
  .route("/")
  .get(getAllProductsHandler)
  .post(requireUser, isAdmin, addProductHandler);
productRouter
  .route("/:productId")
  .get(getProductByIdHandler)
  .put(requireUser, isAdmin, updateProductHandler)
  .delete(requireUser, isAdmin, deleteProductHandler);
