import Review from "../models/ReviewModel.js";
import fs from 'fs'

// Get all Reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(201).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all reviews by a specific user
export const getReviewsByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await Review.find({ user: id }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
      fs.unlinkSync(path);
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
  const { productName, description, skinType, userID, ratingID } = req.body;
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
    if (ratingID) existingReview.ratingID = ratingID;

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
