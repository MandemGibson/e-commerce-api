import { imageUpload } from "./../services/imageUpload.service";
import { Request, Response } from "express";

export const imageUploadHandler = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }
    const imageUrl = await imageUpload(req.file.path);
    if (!imageUrl) {
      return res.status(400).json({ message: "Failed to upload image" });
    }

    res
      .status(201)
      .json({ message: "Image uploaded successfully", data: imageUrl });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
