import express from "express";
import { getAllIngrediants , addIngrediant , updateIngrediant , deleteIngrediant} from "../controllers/IngrediantsControllers.js";

const ingrediantRoutes = express.Router();

ingrediantRoutes.get("/", getAllIngrediants);
ingrediantRoutes.post('/',addIngrediant)
ingrediantRoutes.patch('/update/:id',updateIngrediant)
ingrediantRoutes.delete('/delete/:id' , deleteIngrediant)


export default ingrediantRoutes;
