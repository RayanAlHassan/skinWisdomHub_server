import mongoose from "mongoose";

const ingrediantsModelSchema = new mongoose.Schema(
  {
    name: {
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
  },
  {
    timestamps: true,
  }
);

ingrediantsModelSchema.index({createdAt:-1})

const Ingrediant = mongoose.model("Ingrediant", ingrediantsModelSchema);

export default Ingrediant;
