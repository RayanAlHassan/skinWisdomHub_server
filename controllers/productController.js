import ProductSchema from '../models/productModel.js'; 

// Get one product by ID
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

// Get all products
export const getAll = async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedFields = req.body; // Capture all update fields from request body
    if(req.file) { // If there is a file in the request, update the image
      updatedFields.image = req.file.path;
    }
    
    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      productId,
      updatedFields, // Use updated fields
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

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, brand, categoryID, description, image, averageRating } = req.body;

    const newProduct = new ProductSchema({
      name: name,
      brand: brand,
      categoryID: categoryID,
      description: description,
      image: image,
      averageRating: averageRating
    });

    await newProduct.save();
    res.status(200).json({ message: "Product added successfully!", product: newProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Problem adding product", error: err });
  }
};

// Delete all products
export const deleteAll = async (req, res) => {
  try {
    await ProductSchema.deleteMany({});
    res.status(204).end(); 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductSchema.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(204).end(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search for products
export const searchProduct = async (req, res) => {
  const { query } = req.body;

  try {
    const products = await ProductSchema.find({
      name: { $regex: new RegExp(query, 'i') }, // Adjust the field according to your schema
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
