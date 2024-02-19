import ProductSchema from "../models/productModel.js";
import fs from "fs";

export const getOne = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductSchema.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    categoryID,
    subCategoryID,
    description,
    skinType,
    ingrediantsID,
  } = req.body;
  const image = req.file.filename;

  try {
    const existingProduct = await ProductSchema.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (name) existingProduct.name = name;
    if (categoryID) existingProduct.categoryID = categoryID;
    if (subCategoryID) existingProduct.subCategoryID = subCategoryID;
    if (description) existingProduct.description = description;
    if (skinType) existingProduct.skinType = skinType;
    if (ingrediantsID) existingProduct.ingrediantsID = ingrediantsID;
    if (image) existingProduct.image = image;
    const oldImagePth = `Public/images/${existingProduct.image}`;
    console.log("Old Image Path:", oldImagePth);

    if (req.file) {
      existingProduct.image = req.file.filename;
      fs.unlink(oldImagePth, (err) => {
        if (err) {
          console.error("Error deleting old image:", err);

          return res.status(500).json({ error: `err deleting image old` });
        }
      });
    }
    const updatedProduct = await existingProduct.save();

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Update a Review
export const updateReview = async (req, res) => {
  const id = req.params.id;
  const { productName, title, description, skinType, success, userID } =
    req.body;
  const image = req.file?.path;

  try {
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (productName) existingReview.productName = productName;
    if (title) existingReview.title = title;
    if (description) existingReview.description = description;
    if (skinType) existingReview.skinType = skinType;
    if (success) existingReview.success = success;
    if (image) existingReview.image = image;
    if (userID) existingReview.userID = userID;

    const updatedReview = await existingReview.save();

    return res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const {
    name,
    categoryID,
    subCategoryID,
    description,
    skinType,
    ingrediantsID,
  } = req.body;

  try {
    if (!name || !categoryID || !subCategoryID || !description) {
      const path = `Public/images/${req.file.filename}`;
      fs.unlinkSync(path);
      return res.status(400).json("All fields are required");
    }

    if (!req.file) {
      return res.status(400).json("upload an image");
    }

    const image = req.file.filename;

    const newProduct = await ProductSchema.create({
      name,
      categoryID,
      subCategoryID,
      description,
      image,
      ingrediantsID,
      skinType,
    });
    const path = `Public/images/${req.file.filename}`;
    fs.unlinkSync(path);
    return res.status(200).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Problem adding product", error: err });
  }
};

export const deleteAll = async (req, res) => {
  try {
    await ProductSchema.deleteMany({});
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductSchema.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchProduct = async (req, res) => {
  const { query } = req.body;

  try {
    const products = await ProductSchema.find({
      name: { $regex: new RegExp(query, "i") },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
