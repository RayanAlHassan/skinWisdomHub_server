import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  getAllReviews,
  addReview,
  updateReview,
  getReview,
  deleteReview,
  getReviewsByUser,
  getAverageRatingForReview,
} from "../controllers/ReviewControllers.js";

const reviewRoutes = express.Router();

reviewRoutes.get("/", getAllReviews);
reviewRoutes.get("/onereview/:id", getReview);
reviewRoutes.get("/byuser/:id", getReviewsByUser);
reviewRoutes.post("/", upload.single("image"), addReview);
reviewRoutes.patch("/update/:id", upload.single("image"), updateReview);
reviewRoutes.delete("/delete/:id", upload.single("image"), deleteReview);
reviewRoutes.get("/:id/averageRating", getAverageRatingForReview);

export default reviewRoutes;
