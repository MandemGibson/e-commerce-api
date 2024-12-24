import { Request, Response } from "express";
// import { Product } from "../entity";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/product.service";
import { Product } from "../entity";

export const addProductHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const payload: Product = req.body;
    const {
      productName,
      price,
      brand,
      quantity,
      description,
      imageUrl,
      condition,
      categoryId,
    } = payload;

    if (
      !productName ||
      !price ||
      !brand ||
      !quantity ||
      !description ||
      !imageUrl ||
      !condition 
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!categoryId)
      return res.status(400).json({ message: "Please select a category" });

    const newProduct = await addProduct(payload);
    if (!newProduct)
      return res.status(400).json({ message: "Failed to add product" });

    res
      .status(201)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProductsHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const products = await getAllProducts();
    if (!products?.length)
      return res.status(404).json({ message: "No products found" });

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductByIdHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { productId } = req.params;
    if (!productId)
      return res.status(400).json({ message: "Please provide a product id" });

    const product = await getProductById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { productId } = req.params;
    const payload = req.body;
    if (!productId || !payload)
      return res
        .status(400)
        .json({ message: "Please provide a product id and payload" });
    const updatedProduct = await updateProduct(productId, payload);
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res
      .status(200)
      .json({ message: "Updated product successfully", data: updatedProduct });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { productId } = req.params;
    if (!productId)
      return res.status(400).json({ message: "Please provide a product id" });
    await deleteProduct(productId);

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
