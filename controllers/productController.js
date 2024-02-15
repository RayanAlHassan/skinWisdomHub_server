import ProductSchema from '../models/productModel.js';

export const getOne = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductSchema.findById(productId);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedFields = req.body;
    if(req.file) {
      updatedFields.image = req.file.path;
    }
    
    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, brand, categoryID, subCategoryID, description, image, averageRating, ingredients } = req.body;

    const newProduct = new ProductSchema({
      name,
      categoryID,
      subCategoryID,
      description,
      image,
      ingredients,
      skinType 
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully!", product: newProduct });
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductSchema.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchProduct = async (req, res) => {
  const { query } = req.body;

  try {
    const products = await ProductSchema.find({
      name: { $regex: new RegExp(query, 'i') },
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
