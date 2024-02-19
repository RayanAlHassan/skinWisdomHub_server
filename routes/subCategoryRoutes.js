import express from "express";
import {
  getAll,
  getOne,
  createSubCateg,
  deleteSubCateg,
  updateSubCateg,
  getSubByCategory,
} from "../controllers/subCategoryController.js";

 const subCategoryRoutes = express.Router();

subCategoryRoutes.get("/getone/:id", getOne);
subCategoryRoutes.get("/getall", getAll);
subCategoryRoutes.get("/getsubbycategory/:categoryID", getSubByCategory);

subCategoryRoutes.patch("/:id", updateSubCateg);

subCategoryRoutes.post("/create", createSubCateg);

subCategoryRoutes.delete("/delete/:id", deleteSubCateg);
export {subCategoryRoutes}