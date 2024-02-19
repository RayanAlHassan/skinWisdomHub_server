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
      enum: ["Dry", "Oily", "Mix","All Skin"],
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
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
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
