import mongoose from "mongoose";

const testimonialModelSchema = new mongoose.Schema(
  {

    feedback: {
      type: String,
      required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
      },
 
  },
  { timestamps: true }
);



const testimoniolSchema = mongoose.model("testimoniolSchema", testimonialModelSchema);

export default testimoniolSchema;
