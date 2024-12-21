import { Router } from "express";
import {
  addProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import { requireUser } from "../middlewares/protectedRoute";
export const productRouter = Router();

productRouter
  .route("/")
  .get(getAllProductsHandler)
  .post(requireUser, addProductHandler);
productRouter
  .route("/:productId")
  .get(getProductByIdHandler)
  .put(requireUser, updateProductHandler)
  .delete(requireUser, deleteProductHandler);
