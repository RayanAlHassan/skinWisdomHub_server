import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const reviewModelSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategorySchema",
      required: true,
      autopopulate: true,
    },
    subCategoryID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategorySchema",
      required: false,
      autopopulate: true,
    },
    description: {
      type: String,
      required: true,
    },
    skinType: {
      type: String,
      enum: ["Dry", "Oily", "Mix", "All "],
      required: false,
    },

    image: {
      type: String,
      required: true,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Ddefault&psig=AOvVaw25d2iHYTAHQcvcHobd74UD&ust=1708767351301000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCPCA4cqUwYQDFQAAAAAdAAAAABAE",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
      autopopulate: true,
    }


  },

  {
    timestamps: true,
  }
);
reviewModelSchema.plugin(mongooseAutoPopulate);

reviewModelSchema.index({ createdAt: -1 });

const Review = mongoose.model("Review", reviewModelSchema);

export default Review;
