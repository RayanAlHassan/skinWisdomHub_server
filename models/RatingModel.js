import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const ratingModelSchema = new mongoose.Schema(
  {
  
    value: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
      autopopulate: true,

    },
reviewID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true,
    autopopulate: true,

  },
  },
  { timestamps: true }
);


ratingModelSchema.plugin(mongooseAutoPopulate);

const ratingSchema = mongoose.model(
  "ratingSchema",
  ratingModelSchema
);

export default ratingSchema;
