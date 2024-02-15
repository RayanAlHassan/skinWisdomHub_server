import express from "express";
import {
  getAll,
  getOne,
  createSubCateg,
  deleteSubCateg,
  updateSubCateg,
  getSubByCategory,
} from "../controllers/subCategoryController.js";

export const subCategoryRouter = express.Router();

subCategoryRouter.get("/getone/:id", getOne);
subCategoryRouter.get("/getall", getAll);
subCategoryRouter.get("/getsubbycategory/:categoryID", getSubByCategory);

subCategoryRouter.patch("/:id", updateSubCateg);

subCategoryRouter.post("/create", createSubCateg);

subCategoryRouter.delete("/delete/:id", deleteSubCateg);
