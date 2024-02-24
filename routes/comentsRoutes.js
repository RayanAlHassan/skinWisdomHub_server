import express from "express";
import { getAllComments , addcoments , updatecoments , deletecoments} from "../controllers/comentsController.js";

const commentsRoutes = express.Router();

commentsRoutes.get("/", getAllComments);
commentsRoutes.post('/create',addcoments)
commentsRoutes.patch('/update/:id',updatecoments)
commentsRoutes.delete('/delete/:id' , deletecoments)


export default commentsRoutes;
