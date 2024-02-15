import Review from "../models/ReviewModel.js";

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
  const { productName, title, description, skinType, success, user } = req.body;
  const image = req.file?.path;

  try {
    if (
      !productName ||
      !title ||
      !description ||
      !skinType ||
      !success ||
      !user
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = await Review.create({
      productName,
      title,
      description,
      skinType,
      success,
      image,
      user,
    });
    return res.status(200).json(newReview);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a Review
export const updateReview = async (req, res) => {
  const id = req.params.id;
  const { productName, title, description, skinType, success, user } = req.body;
  const image = req.file?.path;

  try {
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (productName) existingReview.productName = productName;
    if (title) existingReview.title = title;
    if (description) existingReview.description = description;
    if (skinType) existingReview.skinType = skinType;
    if (success) existingReview.success = success;
    if (image) existingReview.image = image;
    if (user) existingReview.user = user;

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

    await Review.deleteOne({ _id: id });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
