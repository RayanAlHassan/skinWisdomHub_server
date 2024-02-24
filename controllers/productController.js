import UserSchema from "../models/UserModel.js";
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

  try {
    const existingProduct = await ProductSchema.findById(id);
    if (!existingProduct) {
      const path = `Public/images/${req.file.filename}`;
      fs.unlinkSync(path);
      return res.status(404).json({ error: "Product not found" });
    }

    if (name) existingProduct.name = name;
    if (categoryID) existingProduct.categoryID = categoryID;
    if (subCategoryID) existingProduct.subCategoryID = subCategoryID;
    if (description) existingProduct.description = description;
    if (skinType) existingProduct.skinType = skinType;
    if (ingrediantsID) existingProduct.ingrediantsID = ingrediantsID;
    // if (image) existingProduct.image = image;

    console.log(existingProduct.image);

    const oldImagePath = `Public/images/${existingProduct.image}`;

    // console.log(oldImagePath)

    if (req.file) {
      console.log(req.file.filename);
      existingProduct.image = req.file.filename;

      fs.unlinkSync(oldImagePath, (err) => {
        if (err) {
          return res.status(500).json({ error: `error deleting the image` });
        }
      });
    }

    // console.log("Old Image Path:", oldImagePth);

    await existingProduct.save();

    // console.log(existingProduct)

    return res.status(200).json(existingProduct);
  } catch (error) {
    console.error(error);
    const imagePath = `Public/images/${req.file.filename}`;
    fs.unlinkSync(imagePath);
    return res.status(500).json({ error: error.message });
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

    return res.status(200).json(newProduct);
  } catch (err) {
    console.log(err);
    const path = `Public/images/${req.file.filename}`;
    fs.unlinkSync(path);
    res.status(500).json({ message: "Problem adding product", error: err });
  }
};

export const deleteAll = async (req, res) => {
  try {
   
    await ProductSchema.deleteMany({});
    res.status(204).json({message:`all product deleted`});
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//delete one product
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductSchema.findById(productId);

    // console.log(deletedProduct)

    if (!deletedProduct) {
      return res.status(404).json({ error: `Product Not found` });
    }

    const imagePath = `Public/images/${deletedProduct.image}`;
    fs.unlinkSync(imagePath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting Product" });
      }
    });

    await ProductSchema.deleteOne({ _id: productId });

    return res.status(200).json({ message: "Product deleted seccessfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const searchProduct = async (req, res) => {
  const { query, skinType, ingredients } = req.body;
  let filter = { name: { $regex: new RegExp(query, "i") } };

  if (skinType) {
    filter.skinType = skinType;
  }

  if (ingredients && ingredients.length > 0) {
    filter.ingrediantsID = { $all: ingredients }; // Assuming ingrediantsID is an array of ingredient IDs
  }

  try {
    const products = await ProductSchema.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// get last 8 products 

export const getLastEight = async (req, res) => {
  try {
    const allProducts = await ProductSchema.find().sort({ _id: -1 }).limit(8);
    if (!allProducts || allProducts.length == 0) {
      return res.status(404).send("No products found!");
    }
    return res.status(200).json({ products: allProducts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot fetch products" });
  }
};

//search product by skin type and ingrediants
export const getProducts = async (req, res) => {
  try {
    const { skinType, ingredients , categoryID,subCategoryID } = req.query;
console.log(req.query)
    const filter = {};
    if (skinType) {
      filter.skinType = skinType;
    }
    if (ingredients) {
      filter.ingrediantsID = { $in: ingredients.split(',') };
    }
    if (categoryID) {
      filter.categoryID = categoryID;
    }
     if (subCategoryID) {
      filter.subCategoryID = subCategoryID;
    }

    const products = await ProductSchema.find(filter)
      .populate('categoryID')
      .populate('subCategoryID')
      .populate('ingrediantsID');

    res.json({"productss":products});
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
