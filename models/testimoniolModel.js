import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const testimonialModelSchema = new mongoose.Schema(
  {

    feedback: {
      type: String,
      required: true,
    },
    userID: {
      index:true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
        autopopulate: true,

      },
      status: {
        type: String,
        enum: ["pending", "rejected", "accepted"],
        required: true,
      },
  
  },
  { timestamps: true }
);


testimonialModelSchema.plugin(mongooseAutoPopulate);

const testimoniolSchema = mongoose.model("testimoniolSchema", testimonialModelSchema);

export default testimoniolSchema;
