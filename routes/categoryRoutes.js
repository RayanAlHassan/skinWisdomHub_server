import express from "express";
import {
  createCategory,
  getCategoryByID,
  getAllCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import upload from "../middlewares/multer.js";

export const categoryRouter = express.Router();

categoryRouter.post("/create", upload.single("image"), createCategory);

categoryRouter.get("/getone/:id", getCategoryByID);
categoryRouter.get("/getall", getAllCategories);

categoryRouter.put("/update/:id", upload.single("image"), updateCategory);

categoryRouter.delete("/delete/:id", deleteCategory);
