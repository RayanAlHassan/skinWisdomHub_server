import mongoose from "mongoose";

const reviewModelSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skinType: {
      type: String,
      enum: ["Dry", "Oily", "Combination"],
      required: true,
    },
    success: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewModelSchema.index({createdAt:-1})

const Review = mongoose.model("Review", reviewModelSchema);

export default Review;
