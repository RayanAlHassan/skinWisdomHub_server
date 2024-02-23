import express from "express";
import {
  getAll,
  getOne,
  updateProduct,
  deleteProduct,
  createProduct,
  searchProduct,
  deleteAll,
  getLastEight,
  getProducts,

} from "../controllers/productController.js";
import {upload} from "../middlewares/multer.js"
import { authenticateUser, authorizeUser } from "../middlewares/auth.js";

const productRoutes = express.Router();

productRoutes.get("/getone/:id", getOne);
productRoutes.get("/getall", getAll);
productRoutes.put("/:id", upload.single("image"),  authenticateUser,
authorizeUser(["admin"]), updateProduct);
productRoutes.post("/create", upload.single("image"),createProduct);
productRoutes.delete("/thanos", deleteAll);
productRoutes.delete("/:id",  authenticateUser,
authorizeUser(["admin"]), deleteProduct);
productRoutes.post("/search", searchProduct);
productRoutes.get("/getLastEight", getLastEight);
productRoutes.get('/products', getProducts);

export  {productRoutes}