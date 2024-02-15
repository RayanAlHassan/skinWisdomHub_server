import SubCategorySchema from "../models/subCategoryModel.js";
import mongoose from "mongoose";
// Fetch all subCateg
export const getAll = async (req, res) => {
  try {
    const allSubCteg = await SubCategorySchema.find();
    if (allSubCteg) {
      return res.status(200).json({ subCateg: allSubCteg });
    } else {
      return res.status(300).json(message, "there is no subCategory");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "cannot fetch subCateg" });
  }
};

// Fetch one SubCateg by ID
export const getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const SubCateg = await SubCategorySchema.findById({ _id: id });
    if (SubCateg) {
      return res
        .status(200)
        .json({ message: "fetched one SubCateg", fetchedSubCateg: SubCateg });
    } else {
      return res.status(404).json({ error: "SubCateg Not Found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server err!" });
  }
};

// Update SubCateg

export const updateSubCateg = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such SubCateg" });
  }

  try {
    const { name, arabicName } = req.body;

    await SubCategorySchema.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          arabicName: arabicName,
        },
      }
    );

    return res.status(200).json({ message: "SubCateg updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Trouble updating SubCateg info" });
  }
};

// Delete SubCateg

export const deleteSubCateg = async (req, res) => {
  const id = req.params.id;
  try {
    await SubCategorySchema.deleteOne({ _id: id });
    res.status(200).json({ message: "SubCateg deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: " could not delete SubCateg" });
  }
};

//create SubCateg

export const createSubCateg = async (req, res) => {
  const { name, categoryID, arabicName } = req.body;
  try {
    const newSubCateg = new SubCategorySchema({
      name,
      categoryID,
      arabicName,
    });
    await newSubCateg.save();
    res.status(200).json({
      message: "SubCateg added successfully !",
      SubCateg: newSubCateg,
    });
  } catch (err) {
    res.status(500).json({ message: "problem adding SubCateg", error: err });
  }
};

//get by category

export const getSubByCategory = async (req, res) => {
  try {
    const categoryID = req.params.categoryID;
    const subCategories = await SubCategorySchema.find({
      categoryID: categoryID,
    }).populate("categoryID");
    res.status(200).json({
      message: `fetched categories under ${subCategories[0].categoryID.name} :`,
      subCategories: subCategories,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error fetching sub categories", error: err });
  }
};
