import express from "express";
import {
  createCategory,
  getCategoryByID,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
// import upload from "../middlewares/multer.js";
import { upload } from "../middlewares/multer.js";

 const categoryRoutes = express.Router();

categoryRoutes.post("/create", upload.single("image"), createCategory);

categoryRoutes.get("/getone/:id", getCategoryByID);
categoryRoutes.get("/getall", getAllCategories);

categoryRoutes.put("/update/:id", upload.single("image"), updateCategory);

categoryRoutes.delete("/delete/:id", deleteCategory);

export {categoryRoutes}