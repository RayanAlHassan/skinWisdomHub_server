import express from "express";
import { getAllRatings , addRating , updaterating , deleteRating,calculateAverageRating} from "../controllers/RatingController.js";

const ratingRoutes = express.Router();

ratingRoutes.get("/", getAllRatings);
ratingRoutes.post('/create',addRating)
ratingRoutes.patch('/update/:id',updaterating)
ratingRoutes.delete('/delete/:id' , deleteRating)
ratingRoutes.get('/avg' , calculateAverageRating)


export default ratingRoutes;
