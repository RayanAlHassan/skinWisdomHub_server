import mongoose from "mongoose";

const categoryModelSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
 
  },
  { timestamps: true }
);



const CategorySchema = mongoose.model("CategorySchema", categoryModelSchema);

export default CategorySchema;
