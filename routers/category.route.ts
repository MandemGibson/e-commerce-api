import { Router } from "express";
import {
  createCategoryHandler,
  createManyCategoriesHandler,
  deleteCategoryHandler,
  getAllCategoryHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
} from "../controllers/category.controller";
export const categoryRouter = Router();

categoryRouter.post("/bulk", createManyCategoriesHandler)
categoryRouter
  .route("/")
  .get(getAllCategoryHandler)
  .post(createCategoryHandler);
categoryRouter
  .route("/:categoryId")
  .get(getCategoryByIdHandler)
  .put(updateCategoryHandler)
  .delete(deleteCategoryHandler);