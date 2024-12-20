import { Request, Response } from "express";
import {
  createCategory,
  createManyCategories,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "./../services/category.service";

export const createCategoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const payload = req.body;
    if (!payload)
      return res.status(400).json({ message: "Category name is required" });

    const category = await createCategory(payload);
    res
      .status(201)
      .json({ message: "Category added successfully", data: category });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createManyCategoriesHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {categories} = req.body;
    if (!categories.length)
      return res.status(400).json({ message: "Add at least one category" });

    const newCategories = await createManyCategories(categories);
    res
      .status(201)
      .json({ message: "Categories added successfully", data: newCategories });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCategoryHandler = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const categories = await getAllCategory();
    if (!categories?.length)
      return res.status(404).json({ message: "No categories found" });

    res.status(200).json(categories);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCategoryByIdHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { categoryId } = req.params;
    if (!categoryId)
      return res.status(400).json({ message: "Category ID required" });

    const category = await getCategoryById(categoryId);
    if (!category)
      return res
        .status(404)
        .json({ message: `No category found with id ${categoryId}` });

    res.status(200).json(category);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCategoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { categoryId } = req.params;
    if (!categoryId)
      return res.status(400).json({ message: "Category ID required" });

    const payload = req.body;
    if (!payload)
      return res.status(400).json({ message: "Payload cannot be empty" });

    const updatedCategory = await updateCategory(categoryId, payload);
    if (!updatedCategory)
      return res.status(400).json({ message: "Couldn't update category" });

    res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCategoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { categoryId } = req.params;
    if (!categoryId)
      return res.status(400).json({ message: "Category ID required" });

    await deleteCategory(categoryId);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
