import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const productModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: Number,
      required: true,
    },
    categoryID: {
      type: String,
      required: false,
    },
   
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    averageRating: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductSchema = mongoose.model('ProductSchema', productModelSchema);

export default ProductSchema;

