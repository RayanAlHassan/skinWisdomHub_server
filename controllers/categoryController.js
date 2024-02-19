import CategorySchema from "../models/categoryModel.js";
import fs from 'fs'

//create category

export const createCategory = async (req,res)=>{
  const {name} = req.body;

  try {
    if(!name ){
      const path = `Public/images/${req.file.filename}`;
      fs.unlinkSync(path)
      return res.status(400).json("All fields are required")
    }

    // console.log(req.file.filename)

    if(!req.file){
      return res.status(400).json("upload an image")
    }

    const image = req.file.filename;

    const newCategory = await CategorySchema.create({
            name,
            image,
        
          });

          return res.status(200).json(newCategory)

  } catch (error) {
    console.log(error);
    const path = `Public/images/${req.file.filename}`;
      fs.unlinkSync(path)
  res.status(500).json({ message: "Problem adding Category", error: error });
  }
}

//get category

export const getCategoryByID = async (req, res) => {
  const id = req.params.id;
  try {
    const fetchedCategory = await CategorySchema.findOne({ _id: id });
    if (fetchedCategory) {
      res
        .status(200)
        .json({ message: "Category found ! ", category: fetchedCategory });
    } else {
      res.status(404).json({ message: "Category does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("error fetching category");
  }
};

//get all categories

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await CategorySchema.find();
    res.status(200).json({
      message: "the following is the list of categories",
      categories: allCategories,
    });
  } catch (err) {
    res.status(500).json({ message: "problem fetching categories !" });
  }
};

//update category

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, arabicName } = req.body;
    let find = await CategorySchema.findById({ _id: id });
    const image = req.file ? req.file.filename : find.image;

    const updatedCategory = await CategorySchema.findByIdAndUpdate(
      { _id: id },
      { $set: { name: name, arabicName: arabicName, image: image } }
    );
    res.status(200).json({
      message: "category updated successfully !",
      category: updatedCategory,
    });
  } catch (err) {
    res.status(500).json({ message: "problem updating category !" });
  }
};

//delete category

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // Use findByIdAndDelete for more straightforward deletion by ID
    const deletedCategory = await CategorySchema.findByIdAndDelete(id);

    if (!deletedCategory) {
      // If no category is found with the given ID
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // If the category is deleted successfully
    res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (err) {
    // Handle unexpected errors
    console.error("Error deleting category:", err);
    res
      .status(500)
      .json({ message: "Could not delete category", error: err.message });
  }
};
