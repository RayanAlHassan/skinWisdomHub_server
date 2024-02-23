import express from "express";
import { getAllTestimoniol , addTesteminol , updateTesteminol , deleteTesteminol} from "../controllers/testimoniolController.js";

const testimoniolRoutes = express.Router();

testimoniolRoutes.get("/", getAllTestimoniol);
testimoniolRoutes.post('/create',addTesteminol)
testimoniolRoutes.patch('/update/:id',updateTesteminol)
testimoniolRoutes.delete('/delete/:id' , deleteTesteminol)


export default testimoniolRoutes;
