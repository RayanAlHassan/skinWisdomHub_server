import { error } from "console";
import ratingSchema from "../models/RatingModel.js";
import Review from "../models/ReviewModel.js";
import fs from 'fs'

// Get all Reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
    .populate("userID")
    .sort({ createdAt: -1 });
    const reviewWithAv = await Promise.all(reviews.map(async (review) => {
      const avg = await calculateAverageRating(review._id);
      return { ...review.toJSON(), rate: avg.rate, totalRatingValue: avg.totalRatingValue };
    }));
    res.status(200).json(reviewWithAv); // Send modified reviews with average ratings
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Calculate average rating for a review
export const calculateAverageRating = async (reviewID) => {
  const ratings = await ratingSchema.find({ reviewID });
  const totalRatings = ratings.length;
  const totalRates = ratings.reduce(
    (acc, rating) => acc + rating.value,
    0
  );
  console.log(Number(totalRatings)>0)
  const averageRating = Number(totalRatings) > 0 ? (Number(totalRates) / Number(totalRatings)) : 0;
  return {totalRatingValue:totalRatings,rate:averageRating}
  // await Review.findOneAndUpdate({ _id: reviewID }, { averageRating });
};
// Get all reviews by a specific user
export const getReviewsByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await Review.find({ userID: id }).sort({ createdAt: -1 });

    // Calculate average rating for each review
    const reviewsWithAvg = await Promise.all(reviews.map(async (review) => {
      const avg = await calculateAverageRating(review._id);
      return { ...review.toJSON(), rate: avg.rate, totalRatingValue: avg.totalRatingValue };
    }));

    res.status(200).json(reviewsWithAvg); // Send modified reviews with average ratings

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get one Review
export const getReview = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await Review.findById(id);

    if (review) {
      res.status(200).json(review);
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add A review
export const addReview = async (req, res) => {
  const { productName, categoryID , subCategoryID , description, skinType, userID } =
    req.body;
  // const image = req.file?.path;

  try {
    if (
      !productName ||
      !categoryID ||
      !subCategoryID ||
      !description ||
      !skinType ||
      !userID 
      // !ratingID
    ) {
      const path = `Public/images/${req.file.filename}`;
      if (req.file && fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
      
      return res.status(400).send("all fields are required are required !!");
    }

    if (!req.file) {
      return res.status(400).json({ error: "image is required" });
    }

    const image = req.file.filename;

    const newReview = await Review.create({
      productName,
      categoryID,
      subCategoryID,
      description,
      // ratingID,
      skinType,
      image,
      userID,
      // comments
    });

    return res.status(200).json(newReview);
  } catch (error) {
    console.log(error);
    const path = `Public/images/${req.file.filename}`;
    fs.unlinkSync(path);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Review
export const updateReview = async (req, res) => {
  const id = req.params.id;
  const { productName, description, skinType, userID } = req.body;
  // const image = req.file?.path;

  try {
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (productName) existingReview.productName = productName;
    // if (title) existingReview.title = title;
    if (description) existingReview.description = description;
    if (skinType) existingReview.skinType = skinType;
    // if (success) existingReview.success = success;
    if (image) existingReview.image = image;
    if (userID) existingReview.userID = userID;
    // if (ratingID) existingReview.ratingID = ratingID;

    const updatedReview = await existingReview.save();

    return res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const id = req.params.id;
  try {
    const existingReview = await Review.findById(id);

    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    
    const imagePath = `Public/images/${existingReview.image}`;
    fs.unlinkSync(imagePath, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error deleting the review's image" });
      }
    });

    await Review.deleteOne({ _id: id });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAverageRatingForReview = async (req, res) => {
  const reviewID = req.params.id;
  
  try {
    const ratings = await ratingSchema.find({ reviewID });
    const totalRatings = ratings.length;
    const totalRates = ratings.reduce((acc, rating) => acc + rating.value, 0);
    const averageRating = totalRatings > 0 ? totalRates / totalRatings : 0;

    res.status(200).json({ averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};