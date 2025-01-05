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
import { upload } from "../utils/multer";
export const productRouter = Router();

productRouter
  .route("/")
  .get(getAllProductsHandler)
  .post(requireUser, isAdmin, upload.single("imageUrl"), addProductHandler);
productRouter
  .route("/:productId")
  .get(getProductByIdHandler)
  .put(requireUser, isAdmin, updateProductHandler)
  .delete(requireUser, isAdmin, deleteProductHandler);
