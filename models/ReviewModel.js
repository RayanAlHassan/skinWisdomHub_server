import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const reviewModelSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    // title: {
    //   type: String,
    //   required: true,
    // },
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
      enum: ["Dry", "Oily", "Mix","All Skin"],
      required: true,
    },
    // success: {
    //   type: Boolean,
    //   default: false,
    // },
    image: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
      autopopulate: true,

    },
    ratingID:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"ratingSchema",
      require:false,
      autopopulate:true
    }],
    // averageRating: {
    //   type: Number,
    //   default: 0,
    // },
  },

  {
    timestamps: true,
  }
);
reviewModelSchema.plugin(mongooseAutoPopulate);

reviewModelSchema.index({createdAt:-1})

const Review = mongoose.model("Review", reviewModelSchema);

export default Review;
