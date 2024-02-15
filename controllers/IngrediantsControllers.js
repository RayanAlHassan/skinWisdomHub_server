import Ingrediant from "../models/IngrediantsModel.js";

// Get all Ingrediants
export const getAllIngrediants = async (req, res) => {
  try {
    const ingrediants = await Ingrediant.find().sort({ createdAt: -1 });
    res.status(201).json(ingrediants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add A Ingrediant
export const addIngrediant = async (req, res) => {
  const { name, description, skinType } = req.body;

  try {
    if (!name || !description || !skinType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newIngrediant = await Ingrediant.create({
      name,
      description,
      skinType,
    });
    return res.status(200).json(newIngrediant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an Ingrediant
export const updateIngrediant = async (req, res) => {
  const id = req.params.id;
  const { name, description, skinType } = req.body;

  try {
    const existingIngrediant = await Ingrediant.findById(id);
    if (!existingIngrediant) {
      return res.status(404).json({ error: "Ingrediant not found" });
    }

    if (name) existingIngrediant.name = name;
    if (description) existingIngrediant.description = description;
    if (skinType) existingIngrediant.skinType = skinType;

    const updatedIngrediant = await existingIngrediant.save();

    return res.status(200).json(updatedIngrediant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Delete an Ingrediant
export const deleteIngrediant = async (req, res) => {
    const id = req.params.id;
    try {
      const existingIngrediant = await Ingrediant.findById(id);
  
      if (!existingIngrediant) {
        return res.status(404).json({ error: "Ingrediant not found" });
      }
  
      await Ingrediant.deleteOne({ _id: id });
  
      res.status(200).json({ message: "Ingrediant deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
