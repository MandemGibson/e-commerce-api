import cloudinary from "../utils/cloudinary";

export const imageUpload = async (file: string) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "ecommerce",
    });
    return {
      url: result.secure_url,
    };
  } catch (error: any) {
    console.error("Error uploading image", error);
  }
};
