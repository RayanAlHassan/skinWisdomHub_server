import ratingSchema from "../models/RatingModel.js";
import Review from "../models/ReviewModel.js";

// Get all ratings
export const getAllRatings = async (req, res) => {
  try {
    const ratings = await ratingSchema.find().sort({ createdAt: -1 });
    res.status(201).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Calculate average rating for a review
export const calculateAverageRating = async (reviewID) => {
  const ratings = await ratingSchema.find({ reviewID });
  const totalRatings = ratings.length;
  const totalRatingValue = ratings.reduce((acc, rating) => acc + rating.value, 0);
  const averageRating = totalRatings > 0 ? totalRatingValue / totalRatings : 0;
  await Review.findOneAndUpdate({ _id: reviewID }, { averageRating });
};

// Add A ratings
export const addRating = async (req, res) => {
  const { reviewID, value, userID } = req.body;
  console.log("Received data:", { reviewID, value, userID });

  try {
    if (!reviewID || !value || !userID) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Logging MongoDB query
    console.log("Inserting document into MongoDB...");
    const newRate = await ratingSchema.create({
      reviewID,
      value,
      userID,
    });

    console.log("Document inserted successfully:", newRate);
    return res.status(200).json(newRate);
  } catch (error) {
    console.log("Error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an rating
export const updaterating = async (req, res) => {
  const id = req.params.id;
  const { reviewID, value, userID } = req.body;

  try {
    const existingRatings = await ratingSchema.findById(id);
    if (!existingRatings) {
      return res.status(404).json({ error: "rating not found" });
    }

    if (reviewID) existingRatings.reviewID = reviewID;
    if (userID) existingRatings.userID = userID;
    if (value) existingRatings.value = value;


    const updatedRating = await existingRatings.save();

    return res.status(200).json(updatedRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an rating
export const deleteRating = async (req, res) => {
  const id = req.params.id;
  try {
    const existingRatings = await ratingSchema.findById(id);

    if (!existingRatings) {
      return res.status(404).json({ error: "rating not found" });
    }

    await ratingSchema.deleteOne({ _id: id });

    res.status(200).json({ message: "rating deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
